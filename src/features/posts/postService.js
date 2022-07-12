import Title from 'antd/lib/skeleton/Title';
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
const deletePost = async _id => {
  console.log('Holaaaaaaaaaa', _id);
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.delete(API_URL + '/posts/id/' + _id, {
    headers: {
      authorization: user?.token,
    },
  });

  return res.data;
};
const createPost = async post => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.post(API_URL + '/posts/', post, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};
const like = async _id => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.put(
    API_URL + '/users/likes/' + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};
const dislike = async _id => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.put(
    API_URL + '/users/dislikes/' + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const updatePost = async post => {
  console.log('post del service', post);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('comprobar token', user?.token);
  const res = await axios.put(API_URL + '/posts/id/' + post._id, post, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};
const getPostByName = async title => {
  const res = await axios.get(API_URL + '/posts/search/' + title);
  return res.data;
};

const deletePostAdmin = async _id => {
  // console.log('Holaaaaaaaaaa', _id);
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.delete(API_URL + '/posts/delet/id/' + _id, {
    headers: {
      authorization: user?.token,
    },
  });

  return res.data;
};

const postsService = {
  getAllWith,
  getById,
  deletePost,
  createPost,
  like,
  dislike,
  updatePost,
  getPostByName,
  deletePostAdmin,
};

export default postsService;
