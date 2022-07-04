import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Post = () => {
  const { posts } = useSelector(state => state.posts);
  // console.log('user', posts);
  const post = posts.map(post => {
    return (
      <div key={post._id}>
        <Link to={'/post/' + post._id}>
          <h2>{post.title}</h2>
        </Link>
      </div>
    );
  });
  return <div>{post}</div>;
};

export default Post;
