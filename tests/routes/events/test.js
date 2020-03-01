import { getTopics, createTopic, createEvent } from '../utils';

import { v4 as uuidv4 } from 'uuid';

test('Create valid Event', async () => {
  const event = {
    "org": {
      "_id": "aida"
    },
    "name": `smoke-test-event-${uuidv4()}`.substr(0, 64),
    "topics": [],
    "eventDate": {
      "startTime": "2020-03-01T03:00:04.238Z",
      "endTime": "2020-03-02T03:00:04.238Z"
    },
    "creator": "tincher2",
    "description": "hello world"
  };

  const res = await createEvent(event);
  expect(res.status).toEqual(200);
  expect(res.data.event).toMatchObject(event);
});

test('Create topics and event', async () => {
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
  const topics = getAllRes.data.topics.map(t => t._id);

  const event = {
    "org": {
      "_id": "aida"
    },
    "name": `smoke-test-event-${uuidv4()}`.substr(0, 64),
    "topics": topics,
    "eventDate": {
      "startTime": "2020-03-01T03:00:04.238Z",
      "endTime": "2020-03-02T03:00:04.238Z"
    },
    "creator": "tincher2",
    "description": "hello world"
  };

  const createEventRes = await createEvent(event);
  expect(createEventRes.status).toEqual(200);

  const resEvent = createEventRes.data.event;
  resEvent.topics = resEvent.topics.map(t => t._id);
  resEvent.topics.sort();
  event.topics.sort();
  expect(createEventRes.data.event).toMatchObject(event);
});
