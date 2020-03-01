import { createTopic, getTopics } from '../utils';

import { v4 as uuidv4 } from 'uuid';

test('Create valid Topic', async () => {
  const topic = {
    _id: `smoke-test-topic-${uuidv4()}`,
    kind: 'other'
  }

  const res = await createTopic(topic);
  expect(res.status).toEqual(200);
  expect(res.data.topic).toEqual(topic);
});

test('Create and get valid Topic', async () => {
  const topic = {
    _id: `smoke-test-topic-${uuidv4()}`,
    kind: 'other'
  }

  const createRes = await createTopic(topic);
  expect(createRes.status).toEqual(200);
  expect(createRes.data.topic).toEqual(topic);

  const getAllRes = await getTopics();
  expect(getAllRes.status).toEqual(200);
  expect(getAllRes.data.topics).not.toHaveLength(0);

  const getRes = await getTopics({
    whereTopic: {
      _id: topic._id
    }
  });
  expect(getRes.status).toEqual(200);
  expect(getRes.data.topics).toHaveLength(1);
  expect(getRes.data.topics[0]).toEqual(topic);
});
