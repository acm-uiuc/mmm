export const topicCreatedCb = (topic) => ({
  statusCode: 200,
  body: {
    message: 'Topic created',
    topic: topic
  }
});