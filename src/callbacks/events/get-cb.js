export const eventCreatedCb = (events) => ({
  statusCode: 200,
  body: {
    message: `Fetched ${events.length} events`,
    events: events
  }
});
