import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../features/posts/postsSlice';

const PostDetail = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector(state => state.posts);
  // console.log(post);

  const commentBody = post.commentId?.map(comment => {
    return <p key={comment._id}>{comment.body}</p>;
  });

  useEffect(() => {
    dispatch(getById(_id));
  }, []);

  return (
    <>
      <h1>Post detail</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>{commentBody}</p>
    </>
  );
};

export default PostDetail;
