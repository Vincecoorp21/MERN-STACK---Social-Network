import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='hero'>
      <div className='hero-content'>
        <h1 className='hero-title'>bSocial!</h1>
        <Link to='/login'>
          <button type='button' className='hero-button'>
            Login
          </button>
        </Link>
        <Link to='/register'>
          <button type='button' className='hero-button'>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
