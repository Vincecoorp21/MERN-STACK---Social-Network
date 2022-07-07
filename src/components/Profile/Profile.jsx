import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Profile.scss';
import { getUserInfo } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import {
  deletePost,
  getById,
  updatePost,
} from '../../features/posts/postsSlice';
import { Modal } from 'antd';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const { posts } = useSelector(state => state.posts);
  // const [formData, setFormData] = useState({
  //   // title: post.title,
  //   // body: post.body,
  //   // _id,
  // });

  // console.log('Componente Profile', user);
  const dispatch = useDispatch();

  // const { title, body } = FormData;

  // const listapost = user.user?.postId;

  useEffect(() => {
    // console.log('1');
    console.log('state user profile 1', user);

    dispatch(getUserInfo());
    console.log('state user profile 2', user);
    // setFormData({ ...posts });
  }, [posts]);

  const deletePostNew = _id => {
    dispatch(deletePost(_id));
  };

  //MODAL IS COMING

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = _id => {
    setIsModalVisible(true);
    dispatch(getById(_id));
    console.log('soy id', _id);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  //   dispatch(updatePost(formData));
  //   setFormData({ title: '', body: '' });
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // const onChange = e => {
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const userPost = user.postId?.map(userPost => {
    console.log('Esto es en Post', userPost);
    return (
      <div key={userPost._id}>
        <span>{userPost.title}</span>
        <span>
          <button onClick={() => deletePostNew(userPost._id)}>Eliminar</button>
        </span>
        {/* <span>
          <button onClick={() => showModal(userPost._id)}>Edita</button>
          <Modal
            title='Basic Modal'
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
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
          </Modal>
        </span> */}
      </div>
    );
  });

  return (
    <div className='profi-container'>
      <div className='profile-card'>
        <div className='profile-card-header'>
          <div className='profile-image'></div>
          <div className='profile-info'>
            <h3 className='profile-name'>{user?.name}</h3>
            <p className='profile-desc'>{user?.email}</p>
            <p className='profile-desc'>{user?.role}</p>
          </div>
        </div>
        <div className='profile-card-body'>
          <section className='parte-final'>
            <div className='lista1'>
              <h3>{user?.followers?.length}K</h3>
              <h4>Followers</h4>
            </div>
            <div className='lista2'>
              <h3>{user?.following?.length}K</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
