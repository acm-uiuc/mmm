export default {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['email', 'topics'],
      additionalProperties: false,
      properties: {
        email: {
          type: 'string'
        },
        topics: {
          type: 'array',
          items: {
            type: 'object',
            required: ['_id', 'weight'],
            additionalProperties: false,
            properties: {
              _id: {
                type: 'string'
              },
              weight: {
                type: 'number'
              }
            }
          }
        }
      }
    }
  }
};
