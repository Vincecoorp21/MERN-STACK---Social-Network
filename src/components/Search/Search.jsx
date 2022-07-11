import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getPostByName } from '../../features/posts/postsSlice';
import Post from '../Home2/Posts/Post/Post';

const Search = () => {
  const { title } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(title);
    // console.log(postName);
    dispatch(getPostByName(title));
  }, [title]);

  return (
    <div>
      <Post />
    </div>
  );
};

export default Search;
