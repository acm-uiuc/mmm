import middyfy from 'middleware/wrapper';

import GetInputSchema from 'input-schemas/events/get-is';

import Event from 'models/Event';

import { getEventsCB } from 'callbacks/events/get-cb';
import { internalServerErrorCB } from 'callbacks/shared';

const handler = async ({queryStringParameters: {whereEvent, limit}}) => {
  try {
    const events = await Promise.all(
      (
        await Event.find(whereEvent).limit(limit)
      ).map((event) => event.getReturnableEvent())
    );

    return getEventsCB(events);
  } catch (err) {
    console.error(err);
    return internalServerErrorCB();
  }
};

// Wrap our handler with middleware
export default middyfy(handler, GetInputSchema);
