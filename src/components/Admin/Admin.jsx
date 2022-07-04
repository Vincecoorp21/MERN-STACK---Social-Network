import PostAdmin from './PostAdmin/PostAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, getAllWith, reset } from '../../features/posts/postsSlice';
import { useEffect } from 'react';

const Admin = () => {
  const { isLoading } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const getPostsAndReset = async () => {
    await dispatch(getAllWith());
    dispatch(reset());
  };
  useEffect(() => {
    getPostsAndReset();
  }, []);
  if (isLoading) {
    return <h1>Cargando posts...</h1>;
  }
  return (
    <div>
      <h1>Admin</h1>
      <PostAdmin />
    </div>
  );
};
export default Admin;
