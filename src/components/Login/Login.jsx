import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login, reset } from '../../features/auth/authSlice';
import './Login.scss';
import pic from '../../assets/login-pic-wallpaper.jpg';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const dispatch = useDispatch();

  const { isError, isSuccess, message } = useSelector(state => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      notification.error({ message: 'Error', description: message });
    }
    if (isSuccess) {
      notification.success({ message: 'Success', description: message });
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }
    dispatch(reset());
  }, [isError, isSuccess, message]);

  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className='col-1'>
          <img src={pic} alt='fondo' />
        </div>
        <div className='col-2'>
          <h2>bSocial</h2>

          <form onSubmit={onSubmit} className='form-login-container'>
            <label>Email Address </label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              value={email}
              onChange={onChange}
              className='input-field'
            />
            <label>Set Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              value={password}
              onChange={onChange}
              className='input-field'
            />
            <button type='submit'>Login</button>
            <span>
              Don't have an account, <Link to='/register'>Register</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
