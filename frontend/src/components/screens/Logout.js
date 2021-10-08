import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
  handleLogout = () => {
    localStorage.removeItem('token');
  };
  render() {
    return (
      <button
        className='btn waves-effect waves-light #2196f3 blue logout'
        onClick={this.handleLogout}
      >
        Logout
      </button>
    );
  }
}

export default withRouter(Logout);
