import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import {
  LogoutOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import './Header.scss';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const PROFI_URL = 'http://localhost:4000/users/';

  const [title, setTitle] = useState('');

  const handleChange = e => {
    setTitle(e.target.value);
    if (e.key === 'Enter') {
      console.log('aaaaaaaaaa', title);

      navigate('/search/' + title);
    }
  };

  const { pathname } = useLocation();
  if (pathname === '/' || pathname === '/login' || pathname === '/register')
    return null;

  const onLogout = () => {
    // e.preventDefault();
    dispatch(logout());
    notification.success({ message: 'Te has desconectado con éxito' });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  console.log('juaaaaas', user);
  return (
    <nav className='header-nav'>
      <h2>bSocial!</h2>
      <div className='input-container'>
        {/* <img src='/assets/search.svg' alt='' class='search' /> */}
        <SearchOutlined className='search' />
        <input onKeyUp={handleChange} name='text' className='input-search2' />
      </div>
      <div className='div-icons'>
        <span>
          <Link to='/home2'>
            <svg
              aria-label='Inicio'
              class='_8-yf5'
              color='#262626'
              fill='#262626'
              height='24'
              role='img'
              viewBox='0 0 24 24'
              width='24'
            >
              <path d='M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z'></path>
            </svg>
          </Link>
        </span>
        {user ? (
          <>
            {user.user?.role === 'admin' ? (
              <span>
                <Link to='/admin'>Admin</Link>
              </span>
            ) : (
              ''
            )}
            <span>
              <Link to='/' onClick={onLogout}>
                <LogoutOutlined />
              </Link>
            </span>
            <span>
              <Link to='/profile'>
                <img
                  src={PROFI_URL + user.user?.avatar}
                  className='header-pic'
                />
                {/* src={PROFI_URL + post?.userId?.avatar} */}
              </Link>{' '}
            </span>
          </>
        ) : (
          <>
            <span>
              <Link to='/login'>Login</Link>
            </span>
            <span>
              <Link to='/register'>Register</Link>
            </span>
          </>
        )}
      </div>
    </nav>
  );
};
export default Header;
