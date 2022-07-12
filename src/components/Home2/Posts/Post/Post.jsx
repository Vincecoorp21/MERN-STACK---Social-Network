import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  createPost,
  like,
  dislike,
} from '../../../../features/posts/postsSlice';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './Post.scss';
// import logo from '../../../../assets/login-pic-wallpaper.jpg';

const Post = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const API_URL = 'http://localhost:4000/posts/';

  const PROFI_URL = 'http://localhost:4000/users/';

  const { title, body } = formData;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { posts } = useSelector(state => state.posts);

  const { user } = useSelector(state => state.auth);

  // const bienvenido = user?.name;

  console.log('home user state', user?.user?.name);

  const nombre = user?.user?.name;

  console.log('Nombreeeee', nombre);

  const profile = PROFI_URL + user?.user?.avatar;

  console.log('hellllllllllll', profile);

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //crear nuevo post
  const onSubmit = async e => {
    e.preventDefault();
    await dispatch(createPost(formData));
    e.target.title.value = '';
    e.target.body.value = '';
  };

  // console.log('hola soy nuevo', user);
  const post = posts?.map(post => {
    console.log('dentro del map', user?.name);
    const isAlreadyLiked = post.likes?.includes(user.user?._id);
    // console.log('quiero ver si esta el avatar', post?.avatar);
    // console.log(API_URL + post?.avatar);
    console.log('aaaaaaafffrrrrr', post);
    console.log('Buscando a Carlos', post?.userId?.avatar);
    return (
      <section key={post._id} className='wrapper'>
        <div className='main-card'>
          <div className='card panel'>
            <div className='card-header'>
              <div className='card-header-left'>
                <Link to={'/profile'}>
                  <img
                    src={PROFI_URL + post?.userId?.avatar}
                    alt=''
                    className='picture-title'
                  />
                </Link>
                <span className='card-title user'>{post.userId?.name}</span>
              </div>
              <div className='dropdown'>
                <span className='simbol-right dropbtn'>
                  <Link to={'/post/' + post._id}>{post.title}</Link>{' '}
                </span>
              </div>
            </div>
            <img
              src={API_URL + post?.avatar}
              alt='Berlin width friends'
              class='main-picture'
            />
            <div className='bottom-container'>
              <div className='icon-container'>
                <div className='bottom-icon-right'>
                  {isAlreadyLiked ? (
                    <HeartFilled
                      className='heart'
                      onClick={() => dispatch(dislike(post._id))}
                      style={{ color: '#FF0000' }}
                      text={post.likes?.length}
                    />
                  ) : (
                    <HeartOutlined
                      className='heart'
                      onClick={() => dispatch(like(post._id))}
                    />
                  )}
                  <svg
                    aria-label='Compartir publicación'
                    className='send '
                    color='#8e8e8e'
                    fill='#8e8e8e'
                    height='24'
                    role='img'
                    viewBox='0 0 24 24'
                    width='24'
                  >
                    <line
                      fill='none'
                      stroke='black'
                      stroke-linejoin='round'
                      stroke-width='2'
                      x1='22'
                      x2='9.218'
                      y1='3'
                      y2='10.083'
                    ></line>
                    <polygon
                      fill='none'
                      points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
                      stroke='black'
                      stroke-linejoin='round'
                      stroke-width='2'
                    ></polygon>
                  </svg>
                </div>
                <div className='bottom-icon-left'>
                  <svg
                    aria-label='Guardar'
                    className='_8-yf5 '
                    color='#8e8e8e'
                    fill='#8e8e8e'
                    height='24'
                    role='img'
                    viewBox='0 0 24 24'
                    width='24'
                  >
                    <polygon
                      fill='none'
                      points='20 21 12 13.44 4 21 4 3 20 3 20 21'
                      stroke='black'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                    ></polygon>
                  </svg>
                </div>
              </div>
              <div className='bottom-text-card'>
                <h4>{post.likes.length} people like it</h4>
                <p>
                  <span className='user'>{post.userId?.email}</span> <br />
                  {post.body}
                </p>
                <span>Post at {post.createdAt.slice(0, 10)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  });
  return (
    <>
      <div class='top-container panel'>
        <div className='left-top-panel'>
          <div class='little-card'>
            <img src={profile} alt='' />
            <span class='top-title'>{nombre}</span>
          </div>
        </div>
        <div className='right-top-panel'>
          <div>
            <form onSubmit={onSubmit} className='little-card-again'>
              <input
                type='text'
                name='title'
                value={title}
                onChange={onChange}
                placeholder='Post Title'
                className='input-field'
              />
              <input
                type='text'
                name='body'
                value={body}
                onChange={onChange}
                placeholder='Body Title'
                className='input-field'
              />
              <button type='submit'>New Post</button>
            </form>
          </div>
        </div>
      </div>
      {/* <p>{nombre}</p> */}
      <div>{post}</div>
    </>
  );
};

export default Post;
