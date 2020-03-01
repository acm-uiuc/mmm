import middyfy from 'middleware/wrapper';

import { successCB } from 'callbacks/shared';
import { sendEmailBlast } from './mailjob';

// Temporary - for testing
const handler = async (event) => {
  await sendEmailBlast();
  return successCB();
};

export default middyfy(handler, {});
