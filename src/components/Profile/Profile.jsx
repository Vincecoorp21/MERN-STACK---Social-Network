import React from 'react';
import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import './Profile.scss';
import { getUserInfo, updatePic } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
// import { ImageBackground } from 'react-native';
import {
  deletePost,
  getById,
  updatePost,
} from '../../features/posts/postsSlice';
import { Modal } from 'antd';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  console.log('jooolin', user);
  // console.log('My frieddn', user?.user?.avatar);

  const { post, posts } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });
  // const APII =

  // const PROFI_URL2 = (http://localhost:4000/users/ + '/user?.user?.avatar/');

  const PROFI_URL = 'http://localhost:4000/users/';
  const okmike = PROFI_URL + user?.user?.avatar;
  // console.log('soyMike', okmike);

  // const picurl = PROFI_URL + user?.user?.avatar;

  // console.log('Te estoy llamando', picurl);

  // const res = await axios.delete(API_URL + '/posts/id/' + _id, {
  // (API_URL + '/posts/id/' + _id, {

  // console.log('Componente Profile', user);

  const { title, body } = FormData;

  // const listapost = user.user?.postId;

  useEffect(() => {
    // console.log('1');
    // console.log('state user profile 1', user);
    dispatch(getUserInfo());
    // console.log('state user profile 2', user);
  }, []);

  //cuando haces un cambio de posts me actualizas el estado de user
  useEffect(() => {
    // console.log('1');
    // console.log('state user profile 1', user);
    dispatch(getUserInfo());
    // console.log('state user profile 2', user);
  }, [posts]);

  // useEffect(() => {
  //   // console.log('1');
  //   // console.log('state user profile 1', user);

  //   // console.log('state user profile 2', user);
  //   setFormData({ ...posts });
  // }, [posts]);

  const deletePostNew = _id => {
    dispatch(deletePost(_id));
  };

  //MODAL IS COMING

  const showModal = _id => {
    setIsModalVisible(true);
    dispatch(getById(_id));
    // console.log('soy id fffff', _id);
  };

  const handleOk = _id => {
    // console.log('prueba', _id);
    dispatch(updatePost({ ...formData, _id }));
    setIsModalVisible(false);
  };

  // const handleOk = (_id) => {
  //   console.log(_id)
  //   dispatch(editPost({...formData, _id}));
  //   handleClose(false);
  // };

  // const onSubmit = async e => {
  //   e.preventDefault();
  //   await dispatch(createPost(formData));
  //   e.target.title.value = '';
  //   e.target.body.value = '';
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const onChange = e => {
  //   console.log('cambio');
  //   // setFormData(prevState => ({
  //   //   ...prevState,
  //   //   [e.target.name]: e.target.value,
  //   // }));
  // };
  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    console.log('pic', e.target.myFile?.files[0]);

    if (e.target.myFile?.files[0]) {
      formData.set('myFile', e.target.myFile?.files[0]);
    }
    await dispatch(updatePic(formData));
    dispatch(getUserInfo());
  };

  // console.log('prueba userPost modal', post?._id);
  const userPost = user?.user?.postId?.map(userPost => {
    console.log('comprobandoooo', userPost);
    // console.log('Esto es en Post', userPost);

    return (
      <div key={userPost._id}>
        <span>{userPost?.title}</span>
        <span>
          <button
            className='btn-edit-delet'
            onClick={() => deletePostNew(userPost._id)}
          >
            Delete
          </button>
        </span>
        <span>
          {/* {console.log('dentro render', userPost?._id)} */}
          <button
            className='btn-edit-delet'
            onClick={() => showModal(userPost?._id)}
          >
            Update
          </button>
        </span>
      </div>
    );
  });
  return (
    <div className='profi-container'>
      <div className='profile-card'>
        <div className='profile-card-header'>
          <div className='profile-image2'>
            <img
              src={PROFI_URL + user?.user?.avatar}
              alt=''
              className='profile-image'
            />
          </div>

          <form onSubmit={onSubmit} className='form-user-prof2'>
            <input type='file' name='myFile' />
            <button type='submit'>Update Pic</button>
          </form>

          <br />
          <br />
          <div className='profile-info'>
            <h3 className='profile-name'>{user.user?.name}</h3>
            <p className='profile-desc'>{user.user?.email}</p>
            <p className='profile-desc'>{user.user?.role}</p>
          </div>
        </div>
        <div className='profile-card-body'>
          <section className='parte-final'>
            <div className='lista1'>
              <h3>{user.user?.followers?.length}K</h3>
              <h4>Followers</h4>
            </div>
            <div className='lista2'>
              <h3>{user.user?.following?.length}K</h3>
              <h4>Following</h4>
            </div>
            <div className='lista3'>
              <h3>1.4K</h3>
              <h4>People</h4>
            </div>
          </section>
        </div>
        <div className='profile-card-footer'>
          <div className='foot-card'>
            <span>{userPost}</span>
            <Modal
              title='Basic Modal'
              visible={isModalVisible}
              onOk={() => {
                handleOk(post?._id);
              }}
              onCancel={handleCancel}
            >
              <form className='form-modal-profile'>
                <label>Edit Post Title</label>
                <input
                  type='text'
                  placeholder='Edit Post Title'
                  value={title}
                  name='title'
                  onChange={onChange}
                />
                <br />
                <label>Edit Post Body</label>

                <input
                  type='text'
                  placeholder='Edit Post Body'
                  value={body}
                  name='body'
                  onChange={onChange}
                />
                <br />
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};
{
  /* <Button onClick={() =>{handleOk(post.post._id)} }>Update</Button> */
  // <Button onClick={handleClose}>Cancel</Button>
}

export default Profile;
