import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import { LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
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
  console.log('header', user);
  return (
    <nav className='header-nav'>
      <span>header</span>

      <div>
        <span>
          <Link to='/home2'>
            <HomeOutlined />
          </Link>
        </span>
        {user ? (
          <>
            {user.role === 'admin' ? (
              <span>
                <Link to='/admin'>Admin</Link>
              </span>
            ) : (
              ''
            )}
            <span>
              <Link to='/profile'>{user?.user.name.slice(0, 1)}</Link>{' '}
            </span>
            <span>
              <Link to='/' onClick={onLogout}>
                <LogoutOutlined />
              </Link>
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
