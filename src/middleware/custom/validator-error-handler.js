/** Handles schema validation errors from @middy/validator
 *
 * @return {Object} The middleware.
 */
export default () => ({
  onError: (handler, next) => {
    // if there are a `statusCode` and an `error` field
    // this is a valid http error object
    if (
      handler.error.statusCode &&
      handler.error.message === 'Event object failed validation'
    ) {
      const blame = {};

      for (const detail of handler.error.details) {
        const fields = detail.dataPath.split('.');
        if (detail.params.hasOwnProperty('missingProperty')) {
          fields.push(detail.params.missingProperty);
        }

        const assignment = (obj, i) => {
          if (i < fields.length - 1) {
            if (
              !obj.hasOwnProperty(fields[i]) ||
              typeof obj[fields[i]] !== 'object'
            ) {
              obj[fields[i]] = {};
            }

            assignment(obj[fields[i]], ++i);
          } else {
            obj[fields[i]] = detail.message;
          }
        };

        assignment(blame, 1); // Recursively fill blame, skipping empty strings
      }

      handler.response = {
        statusCode: handler.error.statusCode,
        body: JSON.stringify({
          message: 'Event object failed validation',
          blame: blame
        })
      };

      delete handler.error.statusCode;
      delete handler.error.message;

      return next();
    }

    return next(handler.error);
  }
});
