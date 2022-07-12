import PostAdmin from './PostAdmin/PostAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, getAllWith, reset } from '../../features/posts/postsSlice';
import { useEffect, useState } from 'react';

const Admin = () => {
  const [load, setLoad] = useState(false);
  const { isLoading, posts } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  // const getPostsAndReset = async () => {
  //   await dispatch(getAllWith());
  //   dispatch(reset());
  // };

  const loadSys = async () => {
    setLoad(false);
    dispatch(getAllWith());
    setLoad(true);
  };

  useEffect(() => {
    loadSys();
  }, []);

  // if (isLoading) {
  //   return <h1>Cargando posts...</h1>;
  // }
  return load ? (
    <div>
      <h1>Admin</h1>
      <PostAdmin />
    </div>
  ) : (
    <h1>Cargando posts...</h1>
  );
};
export default Admin;
