import middyfy from 'middleware/wrapper';

import GetInputSchema from 'input-schemas/topics/get-is';

import Topic from 'models/Topic';

import { internalServerErrorCB } from 'callbacks/shared';

const handler = async (event) => {
  return internalServerErrorCB();
};

// Wrap our handler with middleware
export default middyfy(handler, GetInputSchema);
