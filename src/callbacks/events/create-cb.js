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

export const eventDeletedCB = (event) => ({
  statusCode: 200,
  body: {
    message: 'Event deleted',
    event: event
  }
});

export const eventDoesNotExistCB = (_id) => ({
  statusCode: 404,
  body: {
    message: `Event ${_id} does not exist`
  }
});
