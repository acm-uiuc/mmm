import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import validator from '@middy/validator';

import jsonBodyEncoder from 'middleware/custom/json-body-encoder';
import validatorErrorHandler from 'middleware/custom/validator-error-handler';
import errorHandler from 'middleware/custom/error-handler';
// import httpHeaderAuthorizer from 'middleware/custom/http-header-authorizer';
import mongooseConnector from 'middleware/custom/mongoose-connector';

/** Wraps a Serverless api function handler with middleware from
 * the Middy framework.
 *
 * @param  {Function} handler The original Serverless handler function.
 * @param  {Object} inputSchema Optional. Event input schema to enforce.
 * @param  {Boolean} authorized Optional. Whether or not to authenticate the request.
 *
 * @return {Function} The Middy-fyed wrapped function handler.
 */
export default (handler, inputSchema = null, authorized = false) => {
  const middleware = middy(handler)
    .use(mongooseConnector({ databaseURI: process.env.MONGODB_URI }))
    .use(jsonBodyParser())
    .use(jsonBodyEncoder()) // Stringifies the response body
    .use(cors())
    .use(doNotWaitForEmptyEventLoop({ runOnBefore: true, runOnError: true }));

  if (inputSchema) {
    middleware.use(validator({ inputSchema }));
  }

  // if (authorized) {
  //   middleware.use(httpHeaderAuthorizer());
  // }

  middleware
    .use(validatorErrorHandler())
    .use(httpErrorHandler())
    .use(errorHandler());

  return middleware;
};
