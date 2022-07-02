import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='hero'>
      <div className='hero-content'>
        <h1 className='hero-title'>bSocial!</h1>
        {/* <h2 className='hero-subtitle'>
          I'm <span>VinceBC</span>....a Fullstack Web Developer
        </h2> */}
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
      {/* <!-- <img src="/Foto yo 3.jpg" alt="Picture Vince BC " /> --> */}
    </div>
  );
};
export default Home;
