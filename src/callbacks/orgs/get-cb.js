export const getOrgsCB = (orgs) => ({
  statusCode: 200,
  body: {
    message: `Fetched ${orgs.length} orgs`,
    orgs: orgs
  }
});

export const orgDoesNotExistCB = (org) => ({
  statusCode: 400,
  body: {
    message: `org ${org} does not exist`
  }
});
