export default {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['email', 'org'],
      additionalProperties: false,
      properties: {
        email: {
          type: 'string'
        },
        org: {
          type: 'string'
        }
      }
    }
  }
};
