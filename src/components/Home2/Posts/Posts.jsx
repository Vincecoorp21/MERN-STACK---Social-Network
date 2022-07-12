import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../../features/auth/authSlice';
import { getAllWith, reset } from '../../../features/posts/postsSlice';
import Post from './Post/Post';

const Posts = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.posts);

  const getPostsAndReset = async () => {
    await dispatch(getAllWith());
    dispatch(reset());
  };

  useEffect(() => {
    dispatch(getUserInfo());
    getPostsAndReset();
  }, []);

  // useEffect(() => {
  //   dispatch(getUserInfo());
  //   getPostsAndReset();
  // }, []);

  if (isLoading) {
    return <h1>Cargando posts...</h1>;
  }
  return (
    <div>
      <h1>Posts</h1>
      <Post />
    </div>
  );
};

export default Posts;
