export default {
  type: 'object',
  required: ['pathParameters'],
  properties: {
    pathParameters: {
      type: 'object',
      required: ['_id'],
      properties: {
        id: {
          type: 'string'
        }
      }
    }
  }
};
