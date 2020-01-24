import middyfy from 'middleware/wrapper';

import UpdateInputSchema from 'input-schemas/events/update-is';

import Event from 'models/Event';

import { internalServerErrorCB } from 'callbacks/shared';

const handler = async (event) => {
  return internalServerErrorCB();
};

// Wrap our handler with middleware
export default middyfy(handler, UpdateInputSchema);
