import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../features/posts/postsSlice';
import { Link, useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector(state => state.posts);
  console.log('mira aquiiiii', post);

  const commentBody = post.commentId?.map(comment => {
    console.log('perfectooo', comment);
    return <p key={comment._id}>{comment.body}</p>;
  });

  useEffect(() => {
    dispatch(getById(_id));
  }, []);

  //Intento de añadir la card

  const API_URL = 'http://localhost:4000/posts/';

  const PROFI_URL = 'http://localhost:4000/users/';

  return (
    <>
      {/* <h1>Post detail</h1>
      <h2>Title: {post.title}</h2>
      <p>Body: {post.body}</p>
      <p>Coments:{commentBody}</p>
      <br /> */}
      <section className='wrapper'>
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
                <span className='card-title user'>{post?.title}</span>
              </div>
              <div className='dropdown'>
                <span className='simbol-right dropbtn'></span>
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
                  {/* {isAlreadyLiked ? (
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
                  )} */}
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
                <h4>{post?.likes?.length} people like it</h4>
                <p>
                  <span className='user'>{post.userId?.email}</span> <br />
                  {post.body}
                </p>
                <span>
                  <p>Coments:{commentBody}</p>
                </span>
                <span>Post at {post?.createdAt?.slice(0, 10)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetail;
