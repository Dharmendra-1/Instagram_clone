import React from 'react';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      firstName: '',
    };
  }
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
            <img
              alt='profile'
              src='https://images.unsplash.com/photo-1475692277358-d66444784d6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80'
            />
            <button type='submit' name='action'>
              <i class='small material-icons'>add_a_photo</i>
            </button>
          </div>
          <div>
            <h4>{this.state.userName}</h4>
            <p>{this.state.firstName}</p>
            <div className = "user-stats"
            >
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
