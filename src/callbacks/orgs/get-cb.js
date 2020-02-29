export const getOrgsCB = (orgs) => ({
  statusCode: 200,
  body: {
    message: `Fetched ${orgs.length} orgs`,
    orgs: orgs
  }
});
