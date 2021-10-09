import React from 'react';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      firstName: '',
      email: '',
      image: '',
      url: '',
    };
  }

  postDetails = async () => {
    try {
      const data = new FormData();
      data.append('file', this.state.image);
      data.append('upload_preset', 'insta-clone');
      data.append('cloud_name', 'dg3xxjlfx');
      const response = await fetch(
        '	https://api.cloudinary.com/v1_1/dg3xxjlfx/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const fileData = await response.json();
      console.log(fileData.url);

      await fetch('http://localhost:4000/user/img', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.state.email, img: fileData.url }),
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  userData = async () => {
    try {
      const res = await fetch('http://localhost:4000/dashboard/', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      this.setState({
        userName: parseData.last_name,
        firstName: parseData.first_name,
        email: parseData.user_email,
        url: parseData.img,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  componentDidMount() {
    this.userData();
  }

  render() {
    return (
      <div style={{ maxWidth: '550px', margin: '0px auto' }}>
        <div className='profile'>
          <div className='profile-image'>
            <section>
              <img alt='profile' src={this.state.url} />
              <input
                type='file'
                name='filename'
                onChange={(e) => this.setState({ image: e.target.files[0] })}
              />
            </section>
            <section>
              <button type='button' onClick={this.postDetails}>
                <i type='file' className='small material-icons'>
                  add_a_photo
                </i>
              </button>
            </section>
          </div>
          <div>
            <h4>{this.state.userName}</h4>
            <p>{this.state.firstName}</p>
            <div className='user-stats'>
              <h6>40 posts</h6>
              <h6>40 followers</h6>
              <h6>40 following</h6>
            </div>
          </div>
        </div>
        <div className='gallery'>
          <img
            className='item'
            src='https://images.unsplash.com/photo-1475692277358-d66444784d6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80'
            alt='post'
          />
          <img
            className='item'
            src='https://images.unsplash.com/photo-1475692277358-d66444784d6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80'
            alt='post'
          />
          <img
            className='item'
            src='https://images.unsplash.com/photo-1475692277358-d66444784d6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80'
            alt='post'
          />
          <img
            className='item'
            src='https://images.unsplash.com/photo-1475692277358-d66444784d6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80'
            alt='post'
          />
          <img
            className='item'
            src='https://images.unsplash.com/photo-1475692277358-d66444784d6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80'
            alt='post'
          />
          <img
            className='item'
            src='https://images.unsplash.com/photo-1475692277358-d66444784d6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80'
            alt='post'
          />
          <img
            className='item'
            src='https://images.unsplash.com/photo-1475692277358-d66444784d6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80'
            alt='post'
          />
        </div>
      </div>
    );
  }
}

export default Profile;
