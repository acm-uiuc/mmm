export const internalServerErrorCB = () => ({
  statusCode: 500,
  body: {
    message: 'Internal application server error'
  }
});

export const successCB = () => ({
  statusCode: 200,
  body: {
    message: 'Success'
  }
});

export const userDoesNotExistCB = (username) => ({
  statusCode: 404,
  body: {
    message: `User ${username} does not exist`
  }
});
