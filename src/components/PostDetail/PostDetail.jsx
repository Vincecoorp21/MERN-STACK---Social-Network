import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../features/posts/postsSlice';

const PostDetail = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector(state => state.posts);
  console.log('mira aqui', post);

  const commentBody = post.commentId?.map(comment => {
    return <p key={comment._id}>{comment.body}</p>;
  });

  useEffect(() => {
    dispatch(getById(_id));
  }, []);

  return (
    <>
      <h1>Post detail</h1>
      <h2>Title: {post.title}</h2>
      <p>Body: {post.body}</p>
      <p>Coments:{commentBody}</p>
    </>
  );
};

export default PostDetail;
