import axios from 'axios';
const API_URL = 'http://localhost:4000';

//petición a la base de datos y lo que tiene lo devuelve. Authservice todas las peticiones del usuario

const register = async userData => {
  const res = await axios.post(API_URL + '/users', userData);
  return res.data;
};

const login = async userData => {
  const res = await axios.post(API_URL + '/users/login', userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.delete(API_URL + '/users/logout', {
    headers: {
      authorization: user?.token,
    },
  });
  // console.log('primero', res.data);
  if (res.data) {
    // console.log('segundo', res.data);
    localStorage.removeItem('user');
  }
  return res.data;
};

const getUserInfo = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.get(API_URL + '/users/userinfo', {
    headers: {
      authorization: user?.token,
    },
  });
  console.log(res.data);
  return res.data;
};

const authService = {
  register,
  login,
  logout,
  getUserInfo,
};
export default authService;
