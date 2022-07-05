import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createPost } from '../../../../features/posts/postsSlice';
import { LikeOutlined } from '@ant-design/icons';
import './Post.scss';

const Post = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const API_URL = 'http://localhost:4000/assets/posts/';

  const { title, body } = formData;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { posts } = useSelector(state => state.posts);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    await dispatch(createPost(formData));
    e.target.title.value = '';
    e.target.body.value = '';
  };

  const post = posts.map(post => {
    // console.log('post y user', post);
    // console.log('img', post.userId?.avatar);
    return (
      <div key={post._id} className='wrap'>
        <div className='feed-center'>
          <Link to={'/post/' + post._id}>
            <h2>Título Post:{post.title}</h2>
            {/* <p>Creado el {post.updateAt}</p> */}
            {/* <h3>User:{post.userId.name}</h3> */}
          </Link>
          <p>{post.userId?.name}</p>
          <span>
            <LikeOutlined />
          </span>
          <span>
            {/* <img src={API_URL + post.userId?.avatar} alt='' /> */}
          </span>
          <br />
          <br />
          <hr />
        </div>
      </div>
    );
  });
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type='text' name='title' value={title} onChange={onChange} />
        <input type='text' name='body' value={body} onChange={onChange} />
        <button type='submit'>Publicar</button>
      </form>
      <div>{post}</div>
    </>
  );
};

export default Post;
