import middyfy from 'middleware/wrapper';

import GetInputSchema from 'input-schemas/events/get-is';

import Event from 'models/Event';

import { internalServerErrorCB } from 'callbacks/shared';

const handler = async (event) => {
  return internalServerErrorCB();
};

// Wrap our handler with middleware
export default middyfy(handler, GetInputSchema);
