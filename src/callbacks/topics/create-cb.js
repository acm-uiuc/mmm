export const topicCreatedCB = (topic) => ({
  statusCode: 200,
  body: {
    message: 'Topic created',
    topic: topic
  }
});
