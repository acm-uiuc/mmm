export default {
  type: 'object',
  required: ['headers', 'pathParameters'],
  properties: {
    queryStringParameters: {
      type: 'object',
      required: ['event'],
      additionalProperties: false,
      properties: {
        whereEvent: {
          type: object // TODO[Bailey]: restrict where clause params
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