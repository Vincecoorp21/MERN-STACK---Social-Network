import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Profile.scss';
// import { getUserInfo } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  // const { posts } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  console.log('hola', user);

  const listapost = user.user.postId;

  // console.log('soy una list', listapost);

  useEffect(() => {
    console.log('1');
    // dispatch(getUserInfo());
  }, []);

  const userPost = listapost?.map(userPost => {
    // console.log('2', userPost);
    return (
      <div key={userPost._id}>
        <span>{userPost.title}</span>
        <span>
          <button>Hola</button>
        </span>
      </div>
    );
  });

  return (
    <div className='profi-container'>
      <div className='profile-card'>
        <div className='profile-card-header'>
          <div className='profile-image'></div>
          <div className='profile-info'>
            <h3 className='profile-name'>{user.user.name}</h3>
            <p className='profile-desc'>{user.user.email}</p>
            <p className='profile-desc'>{user.user.role}</p>
          </div>
        </div>
        <div className='profile-card-body'>
          <section class='parte-final'>
            <div class='lista1'>
              <h3>{user.user.followers.length}K</h3>
              <h4>Followers</h4>
            </div>
            <div class='lista2'>
              <h3>{user.user.following.length}K</h3>
              <h4>Following</h4>
            </div>
            <div class='lista3'>
              <h3>1.4K</h3>
              <h4>People</h4>
            </div>
          </section>
        </div>
        <div className='profile-card-footer'>
          <div className='foot-card'>
            <span>{userPost}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
