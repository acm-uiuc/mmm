export const badServiceKeyCB = () => ({
  statusCode: 403,
  body: {
    message: 'This endpoint is only usable by the resumes service'
  }
});
