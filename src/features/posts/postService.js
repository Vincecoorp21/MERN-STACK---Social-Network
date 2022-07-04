import axios from 'axios';
const API_URL = 'http://localhost:4000';

const getAllWith = async () => {
  const res = await axios.get(API_URL + '/posts/getallwith');
  console.log('soy el service', res.data);
  return res.data;
};
const getById = async id => {
  const res = await axios.get(API_URL + '/posts/id/' + id);
  console.log('postBy ID', res.data);
  return res.data;
};

const postsService = {
  getAllWith,
  getById,
};

export default postsService;
