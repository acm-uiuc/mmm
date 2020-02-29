export default {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: ['object', 'null'],
      additionalProperties: false,
      properties: {
        whereTopic: {
          type: 'object'
        },
        limit: {
          type: 'number',
          default: 50,
          maximum: 50
        }
      }
    }
  }
};
