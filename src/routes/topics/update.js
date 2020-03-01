import middyfy from 'middleware/wrapper';

import UpdateInputSchema from 'input-schemas/topics/update-is';

import Topic from 'models/Topic';

import { internalServerErrorCB } from 'callbacks/shared';

const handler = async (event) => {
  return internalServerErrorCB();
};

// Wrap our handler with middleware
export default middyfy(handler, UpdateInputSchema);
