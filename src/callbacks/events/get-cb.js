export const getEventsCB = (events) => ({
  statusCode: 200,
  body: {
    message: `Fetched ${events.length} events`,
    events: events
  }
});
