import middyfy from 'middleware/wrapper';

import { sendEmailBlast } from './mailjob';

// Temporary - for testing
const handler = async (event) => {
  const notifications = await sendEmailBlast();
  return {
    statusCode: 200,
    body: notifications
  };
};

export default middyfy(handler, {});
