export const eventCreatedCB = (event) => ({
  statusCode: 200,
  body: {
    message: 'Event created',
    event: event
  }
});

export const eventUpdatedCB = (event) => ({
  statusCode: 200,
  body: {
    message: 'Event updated',
    event: event
  }
});
