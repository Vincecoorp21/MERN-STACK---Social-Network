import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deletePostAdmin,
  getAllWith,
} from '../../../features/posts/postsSlice';

const PostAdmin = () => {
  const { posts } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWith());
  }, []);

  const post = posts.map(post => {
    return (
      <div className='post' key={post._id}>
        <p>{post.title}</p>
        <button onClick={() => dispatch(deletePostAdmin(post._id))}>
          Delete Post
        </button>
      </div>
    );
  });

  return <div>{post}</div>;
};

export default PostAdmin;
