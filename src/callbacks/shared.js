export const internalServerErrorCB = () => ({
  statusCode: 500,
  body: {
    message: 'Internal application server error'
  }
});

export const badRequestErrorCB = () => ({
  statusCode: 400,
  body: {
    message: 'Bad request'
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

export const devOnlyCB = (username) => ({
  statusCode: 403,
  body: {
    message: 'This endpoint is dev-only'
  }
});
