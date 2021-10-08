import React from 'react';

class Profile extends React.Component {
  userData = async () => {
    try {
      const res = await fetch('http://localhost:4000/dashboard/', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();

      console.log(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    this.userData();
    return (
      <div style={{ maxWidth: '550px', margin: '0px auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '18px 0px',
            borderBottom: '1px solid gray',
          }}
        >
          <div>
            <img
              style={{ width: '160px', height: '160px', borderRadius: '80px' }}
              alt='profile'
              src='https://images.unsplash.com/photo-1475692277358-d66444784d6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80'
            />
          </div>
          <div>
            <h4>John Doe</h4>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '108%',
              }}
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
