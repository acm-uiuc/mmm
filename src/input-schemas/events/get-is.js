export default {
  type: 'object',
  required: ['queryStringParameters'],
  properties: {
    queryStringParameters: {
      type: 'object',
      required: ['whereEvent'],
      additionalProperties: false,
      properties: {
        whereEvent: {
          type: 'object' // TODO[Bailey]: restrict where clause params
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