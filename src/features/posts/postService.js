import axios from 'axios';
const API_URL = 'http://localhost:4000';

const getAllWith = async () => {
  const res = await axios.get(API_URL + '/posts/getAllWith');
  return res.data;
};

const postsService = {
  getAllWith,
};

export default postsService;
