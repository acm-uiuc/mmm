import middyfy from 'middleware/wrapper';

import GetInputSchema from 'input-schemas/topics/get-is';

import Topic from 'models/Topic';

import { getTopicsCB } from 'callbacks/topics/get-cb';
import { internalServerErrorCB } from 'callbacks/shared';

const handler = async ({queryStringParameters: {whereTopic, limit}}) => {
  try {
    const topics = await Promise.all(
      (
        await Topic.find(whereTopic).limit(limit)
      ).map((topic) => topic.getReturnableTopic())
    );

    return getTopicsCB(topics);
  } catch (err) {
    console.error(err);
    return internalServerErrorCB();
  }
};

// Wrap our handler with middleware
export default middyfy(handler, GetInputSchema);
