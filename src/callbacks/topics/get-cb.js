export const topicCreatedCb = (topics) => ({
  statusCode: 200,
  body: {
    message: `Fetched ${topics.length} topics`,
    topics: topics
  }
});
