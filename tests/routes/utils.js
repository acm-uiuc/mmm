import axios from 'axios';

const instance = axios.create({
  validateStatus:  (status) => (status >= 200 && status < 500)
});


const API_BASENAME = 'http://localhost:3000/dev';
const TOPICS_BASENAME = API_BASENAME + '/topics';

export const createTopic = async (topic) => {
  return instance.post(TOPICS_BASENAME, {
    topic: topic
  });
};

export const getTopics = async (queryStringParameters={}) => {
  return instance.get(TOPICS_BASENAME, {params: queryStringParameters});
};