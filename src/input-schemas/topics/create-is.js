export default {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['topic'],
      additionalProperties: false,
      properties: {
        topic: {
          type: 'object',
          required: ['kind', '_id'],
          additionalProperties: false,
          properties: {
            kind: {
              type: 'string',
              enum: ['language', 'domain', 'social', 'other']
            },
            _id: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};
