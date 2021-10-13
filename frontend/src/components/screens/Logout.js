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
      <div className='logout' onClick={this.handleLogout}>
        Log Out
      </div>
    );
  }
}

export default withRouter(Logout);
