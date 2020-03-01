import middyfy from 'middleware/wrapper';

import DeleteInputSchema from 'input-schemas/events/delete-is';

import Event from 'models/Event';

import { internalServerErrorCB } from 'callbacks/shared';
import {
  eventDeletedCB,
  eventDoesNotExistCB
} from 'callbacks/events/create-cb';

const handler = async ({ pathParameters: { _id } }) => {
  try {
    const event = await Event.findByIdAndRemove(_id);
    if (event === null) {
      return eventDoesNotExistCB(_id);
    }
    return eventDeletedCB(await event.getReturnableEvent());
  } catch (err) {
    console.error(err);
    return internalServerErrorCB();
  }
};

// Wrap our handler with middleware
export default middyfy(handler, DeleteInputSchema);
