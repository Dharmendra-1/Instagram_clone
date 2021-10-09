import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
  handleLogout = () => {
    localStorage.removeItem('token');
  };
  render() {
    return (
      <button
        className='btn waves-effect waves-light red logout'
        onClick={this.handleLogout}
      >
        Log Out
      </button>
    );
  }
}

export default withRouter(Logout);
