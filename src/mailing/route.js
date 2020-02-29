import middyfy from 'middleware/wrapper';

import { successCB } from "../callbacks/shared";
import { sendEmailBlast } from './mailjob';

const handler = async (event) => {
    await sendEmailBlast();
    return successCB();
};

export default middyfy(handler, {});
