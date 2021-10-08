import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  getUser = async () => {
    try {
      const res = await fetch('http://localhost:4000/user/home');
      const parseData = await res.json();
      console.log(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  checkAuthenticated = async () => {
    try {
      const res = await fetch('http://localhost:4000/user/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes
        ? this.props.history.push('/home')
        : this.props.history.push('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    this.getUser();
    return (
      <div className='home'>
        <div className='card home-card'>
          <h5>jhon</h5>
          <div className='card-image'>
            <img
              src='https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
              alt='post'
            />
          </div>
          <div className='card-content'>
            <i className='material-icons'>favorite_border</i>
            <h6>title</h6>
            <p>this is a post!</p>
            <input type='text' placeholder='add a comment' />
          </div>
        </div>
        <div className='card home-card'>
          <h5>jhon</h5>
          <div className='card-image'>
            <img
              src='https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
              alt='post'
            />
          </div>
          <div className='card-content'>
            <i className='material-icons'>favorite_border</i>
            <h6>title</h6>
            <p>this is a post!</p>
            <input type='text' placeholder='add a comment' />
          </div>
        </div>
        <div className='card home-card'>
          <h5>jhon</h5>
          <div className='card-image'>
            <img
              src='https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
              alt='post'
            />
          </div>
          <div className='card-content'>
            <i className='material-icons'>favorite_border</i>
            <h6>title</h6>
            <p>this is a post!</p>
            <input type='text' placeholder='add a comment' />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
