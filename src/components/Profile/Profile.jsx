import { useSelector } from 'react-redux';

import './Profile.scss';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  console.log(user);

  return (
    <div className='profi-container'>
      <div className='profile-card'>
        <div className='profile-card-header'>
          <div className='profile-image'></div>
          <div className='profile-info'>
            <h3 className='profile-name'>{user.user.name}</h3>
            <p className='profile-desc'>{user.user.email}</p>
          </div>
        </div>
        <div className='profile-card-body'>
          <section class='parte-final'>
            <div class='lista1'>
              <h3>80K</h3>
              <h4>Followers</h4>
            </div>
            <div class='lista2'>
              <h3>803K</h3>
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
            <span>Post1</span>
            <button>Hola</button>
          </div>
          <div className='foot-card'>
            <span>Post1</span>
            <button>Hola</button>
          </div>
          <div className='foot-card'>
            <span>Post1</span>
            <button>Hola</button>
          </div>
          <div className='foot-card'>
            <span>Post1</span>
            <button>Hola</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
