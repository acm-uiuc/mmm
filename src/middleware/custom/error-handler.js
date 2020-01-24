// eslint-disable-next-line valid-jsdoc
/** A safeguard middleware to ensure uncaught errors are returned as server errors. */
export default () => {
  return {
    onError: (handler, next) => {
      if (
        handler.error &&
        (!handler.response ||
          !handler.response.statusCode ||
          handler.response.statusCode < 400)
      ) {
        console.error(handler.error);
        handler.response = {
          statusCode: 500,
          body: JSON.stringify({
            message: 'Internal Application Server Error'
          })
        };
      }

      return next();
    }
  };
};
