import middyfy from 'middleware/wrapper';

import AuthorizationInputSchema from 'input-schemas/authorization/authorize-is';
import Org from 'models/Org';
import OrgManager from 'models/OrgManager';
import { orgDoesNotExistCB } from 'callbacks/orgs/get-cb';
import { successCB, internalServerErrorCB } from 'callbacks/shared';
import { orgUnauthorizedCB } from 'callbacks/orgs/get-cb';

const handler = async (event) => {
  let org;
  try {
    org = await Org.findOne({ _id: event.body.org });
  } catch (error) {
    return internalServerErrorCB();
  }
  if (!org) {
    return orgDoesNotExistCB(event.body.org);
  }

  const authorized = await org.isUserAuthorized(event.authorizedUser.email);
  if (!authorized) {
    return orgUnauthorizedCB(org);
  }

  const authEntry = {
    email: event.body.email,
    org: event.body.org
  };
  await OrgManager.findOneAndUpdate(authEntry, authEntry, { upsert: true });
  return successCB();
};

export default middyfy(handler, AuthorizationInputSchema, true);
