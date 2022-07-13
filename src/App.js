import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Home2 from './components/Home2/Home2';
import Profile from './components/Profile/Profile';
import 'antd/dist/antd.css';
import PostDetail from './components/PostDetail/PostDetail';
import Admin from './components/Admin/Admin';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/home2' element={<Home2 />} />
          <Route path='/post/:_id' element={<PostDetail />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/search/:title' element={<Search />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
