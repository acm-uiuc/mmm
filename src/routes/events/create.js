import middyfy from 'middleware/wrapper';

import CreateInputSchema from 'input-schemas/events/create-is';

import Event from 'models/Event';
import Org from 'models/Org';
import Topic from 'models/Topic';

import { internalServerErrorCB, badRequestErrorCB } from 'callbacks/shared';
import { orgDoesNotExistCB } from 'callbacks/orgs/get-cb';
import { eventCreatedCB } from 'callbacks/events/create-cb';

const handler = async ({ body: { event } }) => {
  // TODO[Bailey]: Authenticate in middleware

  let orgId;
  try {
    orgId = await Org.findById(event.org._id).select('_id');
    if (orgId === null) {
      return orgDoesNotExistCB(event.org._id);
    } else {
      orgId = orgId._id;
    }
  } catch (err) {
    console.error(err);
    return internalServerErrorCB();
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
      creator: event.creator,
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
export default middyfy(handler, CreateInputSchema);
