import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice';
import { notification } from 'antd';
import './Register.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch(); //Inicializamos Dispatch

  const { isSuccess, message, isError } = useSelector(state => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: 'Success',
        description: message,
      });
    }
    if (isError) {
      notification.error({ message: 'Error', description: message });
    }
    dispatch(reset());
  }, [isSuccess, isError, message]);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      return notification.success({
        message: 'Error',
        description: 'Passwords do not match',
      });
    } else {
      return dispatch(register(formData)); //ejecutamos la accion register
    }
  };
  return (
    <div className='register-container'>
      <form onSubmit={onSubmit}>
        <input type='text' name='name' value={name} onChange={onChange} />
        <input type='email' name='email' value={email} onChange={onChange} />
        <input
          type='password'
          name='password'
          value={password}
          onChange={onChange}
        />
        <input
          type='password'
          name='password2'
          value={password2}
          onChange={onChange}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
