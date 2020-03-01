import axios from 'axios';

const instance = axios.create({
  validateStatus:  (status) => (status >= 200 && status < 500)
});


const API_BASENAME = 'http://localhost:3000/dev';
const TOPICS_BASENAME = API_BASENAME + '/topics';
const EVENTS_BASENAME = API_BASENAME + '/events';

export const createTopic = async (topic) => {
  return instance.post(TOPICS_BASENAME, {
    topic: topic
  }, {
    headers: {
      'NetID': 'tincher2'
    }
  });
};

export const getTopics = async (queryStringParameters={}) => {
  return instance.get(TOPICS_BASENAME, {params: queryStringParameters});
};

export const createEvent = async (event) => {
  return instance.post(EVENTS_BASENAME, {
    event: event
  }, {
    headers: {
      'NetID': 'tincher2'
    }
  });
};

export const updateEvent = async (_id, event) => {
  return instance.patch(EVENTS_BASENAME + `/${_id}`, {
    event: event
  }, {
    headers: {
      'NetID': 'tincher2'
    }
  });
};

// TODO[Bailey]: Add tests for getEvents()
