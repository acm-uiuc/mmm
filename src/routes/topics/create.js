import middyfy from 'middleware/wrapper';

import CreateInputSchema from 'input-schemas/topics/create-is';

import Topic from 'models/Topic';

import { topicCreatedCB } from 'callbacks/topics/create-cb';
import { internalServerErrorCB, devOnlyCB } from 'callbacks/shared';

const handler = async ({ body: { topic } }) => {
  if (!process.env.IS_OFFLINE) {
    return devOnlyCB();
  }
  try {
    const newTopic = new Topic(topic);
    const savedTopic = await newTopic.save();
    return topicCreatedCB(savedTopic.getReturnableTopic());
  } catch (error) {
    console.error(error);
    return internalServerErrorCB();
  }
};

// Wrap our handler with middleware
export default middyfy(handler, CreateInputSchema, false);
