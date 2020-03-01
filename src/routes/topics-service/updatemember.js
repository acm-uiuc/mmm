import middyfy from 'middleware/wrapper';
import UpdateMemberInputSchema from 'input-schemas/topics-service/updatemember-is';
import { badServiceKeyCB } from 'callbacks/topics-service/topicsservice-cb';
import { successCB, internalServerErrorCB } from 'callbacks/shared';
import Member from 'models/Member';

const handler = async (event) => {
  if (event.headers.Authorization !== 'Bearer ' + process.env.TOPICS_KEY) {
    return badServiceKeyCB();
  }
  try {
    await Member.findOneAndUpdate(
      { email: event.body.email },
      { email: event.body.email, interests: event.body.topics },
      { upsert: true, setDefaultsOnInsert: true }
    );
  } catch (error) {
    console.error(error);
    return internalServerErrorCB();
  }
  return successCB();
};

export default middyfy(handler, UpdateMemberInputSchema, false);
