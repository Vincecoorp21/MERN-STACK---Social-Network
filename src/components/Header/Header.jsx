import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { notification } from 'antd';

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

  return (
    <nav>
      <span>header</span>
      <div>
        {user ? (
          <>
            <span>
              <Link to='/' onClick={onLogout}>
                Logout
              </Link>
            </span>
            <span>
              <Link to='/profile'>{user.name}</Link>{' '}
            </span>
            {user.role === 'admin' ? (
              <span>
                <Link to='/admin'>Admin</Link>
              </span>
            ) : (
              ''
            )}
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
