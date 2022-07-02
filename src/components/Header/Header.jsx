import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { pathname } = useLocation();
  if (pathname === '/') return null;

  const onLogout = e => {
    e.preventDefault();
    dispatch(logout());
    navigate('/login');
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
              <Link to='/profile'>{user.user.name}</Link>{' '}
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
