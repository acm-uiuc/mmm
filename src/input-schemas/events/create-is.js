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
          required: ['org', 'creator', 'eventDate', 'topics'],
          additionalProperties: false,
          properties: {
            org: {
              type: 'object',
              additionalProperties: false,
              required: ['name', 'type'],
              properties: {
                name: {
                  type: 'string'
                },
                type: {
                  type: 'string' // TODO[Bailey]: make enum
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
                  type: 'date'
                },
                endTime: {
                  type: 'date'
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
