import middyfy from 'middleware/wrapper';

import GetInputSchema from 'input-schemas/orgs/get-is';

import Org from 'models/Org';

import { getOrgsCB } from 'callbacks/orgs/get-cb';
import { internalServerErrorCB } from 'callbacks/shared';

const handler = async () => {
  try {
    const orgs = await Promise.all(
      (await Org.find()).map((org) => org.getReturnableOrg())
    );

    return getOrgsCB(orgs);
  } catch (err) {
    console.error(err);
    return internalServerErrorCB();
  }
};
// Wrap our handler with middleware
export default middyfy(handler, GetInputSchema);
