import middyfy from 'middleware/wrapper';

import CreateInputSchema from 'input-schemas/topics/create-is';

import Topic from 'models/Topic';

import { internalServerErrorCB } from 'callbacks/shared';

const handler = async ({topic, kind}) => {
  try {
    const topic = new Topic({topic, kind});
    savedTopic = await topic.save();
    return topicCreatedCB(savedTopic.getReturnableTopic());
  } catch(error) {
    console.error(error);
    return internalServerErrorCB();
  }
};

// Wrap our handler with middleware
export default middyfy(handler, CreateInputSchema);
