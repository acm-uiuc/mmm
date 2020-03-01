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
            required: ['name', 'weight'],
            additionalProperties: false,
            properties: {
              name: {
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
