export const getOrgsCB = (orgs) => ({
  statusCode: 200,
  body: {
    message: `Fetched ${topics.length} orgs`,
    orgs: orgs
  }
});
