import middyfy from 'middleware/wrapper';

import DeleteInputSchema from 'input-schemas/events/delete-is';

import Event from 'models/Event';

import { internalServerErrorCB } from 'callbacks/shared';

const handler = async (event) => {
  return internalServerErrorCB();
};

// Wrap our handler with middleware
export default middyfy(handler, DeleteInputSchema);
