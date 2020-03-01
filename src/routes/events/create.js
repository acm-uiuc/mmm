import middyfy from 'middleware/wrapper';

import CreateInputSchema from 'input-schemas/events/create-is';

import Event from 'models/Event';
import Org from 'models/Org';
import Topic from 'models/Topic';

import { internalServerErrorCB, badRequestErrorCB } from 'callbacks/shared';
import { orgDoesNotExistCB } from 'callbacks/orgs/get-cb';
import { eventCreatedCB } from 'callbacks/events/create-cb';
import { orgUnauthorizedCB } from '../../callbacks/orgs/get-cb';

const handler = async (request) => {
  const event = request.body.event;

  let org;
  let orgId;
  try {
    org = await Org.findOne({ _id: event.org._id });
    if (org === null) {
      return orgDoesNotExistCB(event.org._id);
    } else {
      orgId = org._id;
    }
  } catch (err) {
    console.error(err);
    return internalServerErrorCB();
  }

  if (!(await org.isUserAuthorized(request.authorizedUser.email))) {
    return orgUnauthorizedCB(org);
  }

  let topics;
  try {
    topics = await Topic.find({ _id: event.topics }).select('_id');
    topics = topics.map((topic) => topic._id);
  } catch (err) {
    console.error(err);
    return internalServerErrorCB();
  }

  const startTime = new Date(event.eventDate.startTime);
  const endTime = new Date(event.eventDate.endTime);

  if (startTime > endTime) {
    return badRequestErrorCB();
  }

  try {
    const newEvent = new Event({
      name: event.name,
      description: event.description,
      eventDate: {
        startTime: startTime,
        endTime: endTime
      },
      creator: request.authorizedUser.email,
      org: orgId,
      topics: topics,
      location: event.location
    });

    const savedEvent = await newEvent.save();
    return eventCreatedCB(await savedEvent.getReturnableEvent());
  } catch (err) {
    console.error(err);
    return internalServerErrorCB();
  }
};

// Wrap our handler with middleware
export default middyfy(handler, CreateInputSchema, true);
