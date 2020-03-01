import middyfy from 'middleware/wrapper';

import DeleteInputSchema from 'input-schemas/events/delete-is';

import Event from 'models/Event';

import { internalServerErrorCB } from 'callbacks/shared';
import {
  eventDeletedCB,
  eventDoesNotExistCB,
  unauthorizedEventCB
} from 'callbacks/events/create-cb';

const handler = async (request) => {
  const _id = request.pathParameters._id;
  try {
    const event = await Event.findById(_id);
    if (event === null) {
      return eventDoesNotExistCB(_id);
    }
    if (!(await event.isUserAuthorized(request.authorizedUser.email))) {
      return unauthorizedEventCB(_id);
    }
    await Event.findByIdAndRemove(_id);
    return eventDeletedCB(await event.getReturnableEvent());
  } catch (err) {
    console.error(err);
    return internalServerErrorCB();
  }
};

// Wrap our handler with middleware
export default middyfy(handler, DeleteInputSchema, true);
