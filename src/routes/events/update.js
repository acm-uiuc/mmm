import middyfy from 'middleware/wrapper';

import UpdateInputSchema from 'input-schemas/events/update-is';

import Event from 'models/Event';
import Org from 'models/Org';
import Topic from 'models/Topic';

import { internalServerErrorCB, badRequestErrorCB } from 'callbacks/shared';
import { orgDoesNotExistCB, orgUnauthorizedCB } from 'callbacks/orgs/get-cb';
import {
  eventUpdatedCB,
  eventDoesNotExistCB,
  unauthorizedEventCB
} from 'callbacks/events/create-cb';

const handler = async ({
  body: { event },
  pathParameters: { _id },
  authorizedUser: { email }
}) => {
  const oldEvent = await Event.findById(_id);
  if (oldEvent === null) {
    return eventDoesNotExistCB();
  }
  if (!(await oldEvent.isUserAuthorized(email))) {
    return unauthorizedEventCB(_id);
  }

  if (event.hasOwnProperty('org') && event.org._id !== undefined) {
    try {
      const orgId = await Org.findById(event.org._id).select('_id');
      if (orgId === null) {
        return orgDoesNotExistCB(event.org._id);
      }
      if (!(await orgId.isUserAuthorized(email))) {
        return orgUnauthorizedCB(orgId);
      }
      event.org._id = orgId._id;
    } catch (err) {
      console.error(err);
      return internalServerErrorCB();
    }
  }

  if (event.hasOwnProperty('topics') && Array.isArray(event.topics)) {
    try {
      let topics = await Topic.find({ _id: event.topics }).select('_id');
      topics = topics.map((topic) => topic._id);
      event.topics = topics;
    } catch (err) {
      console.error(err);
      return internalServerErrorCB();
    }
  }

  if (event.hasOwnProperty('eventDate')) {
    if (event.eventDate.hasOwnProperty('startTime')) {
      event.startTime = new Date(event.eventDate.startTime);
    }

    if (event.eventDate.hasOwnProperty('endTime')) {
      event.endTime = new Date(event.eventDate.endTime);
    }
  }

  if (event.startTime > event.endTime) {
    return badRequestErrorCB();
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(_id, event, {
      omitUndefined: true,
      new: true
    });
    return eventUpdatedCB(await updatedEvent.getReturnableEvent());
  } catch (err) {
    console.error(err);
    return internalServerErrorCB();
  }
};

// Wrap our handler with middleware
export default middyfy(handler, UpdateInputSchema, true);
