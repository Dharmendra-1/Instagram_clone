import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
  constructor(props) {
    super(props);
    const { setIsAuthenticated } = this.props;
    this.state = {
      setIsAuthenticated,
    };
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.state.setIsAuthenticated(false);
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
