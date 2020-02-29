import middyfy from 'middleware/wrapper';

import CreateInputSchema from 'input-schemas/events/create-is';

import Event from 'models/Event';
import Member from 'models/Member';
import Org from 'models/Org';
import Topic from 'models/Topic';

import { internalServerErrorCB } from 'callbacks/shared';

const handler = async ({ event }) => {
  // TODO[Bailey]: Authenticate in middleware
  let creator;
  try {
    creator = await Member.findById(event.creator); // Does it throw an error if not found??
  } catch (error) {
    return internalServerErrorCB();
  }

  let org;
  try {
    org = await Org.findOne({ name: event.org.name }); // Does it throw an error if not found??
  } catch (error) {
    return internalServerErrorCB();
  }

  let topics;
  try {
    topics = await Topic.find({ name: event.topics });
  } catch (error) {
    return internalServerErrorCB();
  }

  if (event.startDate > event.endDate) {
    return badRequestErrorCB();
  }

  try {
    const newEvent = new Event({
      name: event.name,
      date: event.date,
      creator: creator._id,
      org: org._id,
      topics: topics
    });

    const savedEvent = await newEvent.save();
    return eventCreatedCB(savedEvent.getReturnableEvent());
  } catch (error) {
    return internalServerErrorCB();
  }
};

// Wrap our handler with middleware
export default middyfy(handler, CreateInputSchema);
