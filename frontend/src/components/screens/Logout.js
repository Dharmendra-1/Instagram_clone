import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import M from 'materialize-css';

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
    M.toast({
      html: 'Logout successfully',
      classes: '#43a047 green darken-1',
    });
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
