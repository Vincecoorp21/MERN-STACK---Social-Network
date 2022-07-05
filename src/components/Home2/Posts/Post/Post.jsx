import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createPost } from '../../../../features/posts/postsSlice';
import { LikeOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
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
  // console.log('fuera dle map', posts);
  const { user } = useSelector(state => state.auth);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //crear nuevo post
  const onSubmit = async e => {
    e.preventDefault();
    await dispatch(createPost(formData));
    e.target.title.value = '';
    e.target.body.value = '';
  };

  // const [like, setlike] = useState(posts.like);

  // const [isLiked, setIsLiked] = useState(false);

  // const likeHandler = () => {
  //   setlike(isLiked ? like - 1 : like + 1);
  //   setIsLiked(!isLiked);
  // };
  // console.log('like', like);

  const post = posts.map(post => {
    // console.log('dentro del map', post);
    return (
      <div key={post._id} className='wrap'>
        <div className='feed-center'>
          <Link to={'/post/' + post._id}>
            <h2>Título Post:{post.title}</h2>
          </Link>
          <p>{post.userId?.name}</p>
          <div>
            <span>
              <LikeOutlined />
              <HeartFilled />
              <HeartOutlined />
            </span>
            <span>{post.likes.length} people like it</span>
          </div>
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
