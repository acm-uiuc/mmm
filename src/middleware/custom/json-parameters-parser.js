export default (opts) => ({
  before: (handler, next) => {
    if (
      typeof handler.event.queryStringParameters === 'object' &&
      handler.event.queryStringParameters !== null
    ) {
      for (const [param, value] of Object.entries(
        handler.event.queryStringParameters
      )) {
        if (typeof value === 'string' || value instanceof String) {
          let obj;
          try {
            obj = JSON.parse(value);
          } catch (e) {
            continue;
          }

          handler.event.queryStringParameters[param] = obj;
        }
      }
    }
    next();
  }
});
