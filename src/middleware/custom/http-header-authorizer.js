import User from 'models/User';

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
    const Authorization = handler.event.headers.Authorization; // Safety in validation
    let queriedUser;
    try {
      queriedUser = JSON.parse(handler.event.queryStringParameters.user);
    } catch (err) {
      return;
    }

    if (Authorization.startsWith('Bearer')) {
      try {
        const foundUser = await User.findUser(
          queriedUser.username,
          queriedUser.email
        );
        if (
          foundUser &&
          (await foundUser.verifyToken(Authorization.slice(7)))
        ) {
          handler.event.authorizedUser = foundUser;
        }
      } catch (err) {
        console.error(err);
      }
    } // TODO: standardize all auth info to be in the header aside from register
  }
});
