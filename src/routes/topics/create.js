import middyfy from 'middleware/wrapper';

import CreateInputSchema from 'input-schemas/topics/create-is';

import Topic from 'models/Topic';

import { internalServerErrorCB } from 'callbacks/shared';

const handler = async (event) => {
  return internalServerErrorCB();
};

// Wrap our handler with middleware
export default middyfy(handler, CreateInputSchema);
