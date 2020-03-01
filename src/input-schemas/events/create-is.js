export default {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['event'],
      additionalProperties: false,
      properties: {
        event: {
          type: 'object',
          required: ['org', 'creator', 'eventDate', 'topics', 'name'],
          additionalProperties: false,
          properties: {
            name: {
              type: 'string',
              maxLength: 64
            },
            description: {
              type: 'string',
              default: '',
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
            eventDate: {
              type: 'object',
              additionalProperties: false,
              required: ['startTime', 'endTime'],
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
    }
  }
};
