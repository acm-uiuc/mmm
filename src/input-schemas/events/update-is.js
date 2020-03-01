export default {
  type: 'object',
  required: ['body', 'pathParameters'],
  properties: {
    body: {
      type: 'object',
      required: ['event'],
      additionalProperties: false,
      properties: {
        event: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name: {
              type: 'string',
              maxLength: 64
            },
            description: {
              type: 'string',
              maxLength: 256
            },
            org: {
              type: 'object',
              additionalProperties: false,
              required: ['_id'],
              properties: {
                _id: {
                  type: 'string'
                }
              }
            },
            creator: {
              type: 'string'
            },
            location: {
              type: 'string'
            },
            eventDate: {
              type: 'object',
              additionalProperties: false,
              properties: {
                startTime: {
                  type: 'string',
                  format: 'date-time'
                },
                endTime: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            },
            topics: {
              type: 'array'
            }
          }
        }
      }
    },
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
