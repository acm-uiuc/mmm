import Member from 'models/Member';

const createError = require('http-errors');

/** Parses authentication info from the request before reaching the handler.
 *
 * Checks the header for a bearer token and extracts either the username or
 * email from the request's query parameters.
 *
 * Sets handler.event.authorizedUser to the User model object if the user is
 * successfully authenticated.
 *
 * @return {Object} The middleware.
 */
export default () => ({
  before: async (handler) => {
    handler.event.authorizedUser = null;
    // TODO: Actual authentication
    if (
      handler.event.queryStringParameters &&
      handler.event.queryStringParameters.netid
    ) {
      try {
        const email =
          handler.event.queryStringParameters.netid + '@illinois.edu';
        const member = await Member.findOneAndUpdate(
          { email: email },
          { email: email },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        handler.event.authorizedUser = member;
      } catch (err) {
        console.error(err);
        throw createError(
          500,
          'Internal error occurred while trying to authenticate you'
        );
      }
    } else {
      throw createError(401);
    }
  }
});
