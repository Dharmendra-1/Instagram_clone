import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logout from './screens/Logout';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    const { setIsAuthenticated } = this.props;
    this.state = {
      setIsAuthenticated,
    };
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper white'>
          <Link to='/'></Link>
          <Link to='/signup'></Link>
          <Link to='/' className='brand-logo left'>
            Instagram
          </Link>
          <ul id='nav-mobile' className='right'>
            <li>
              <Link to='/home'>
                <i className='medium material-icons'>home</i>
              </Link>
            </li>
            <li>
              <Link to='/profile'>
                <i className='medium material-icons'>account_circle</i>
              </Link>
            </li>
            <li>
              <Link to='/createpost'>
                <i className='medium material-icons'>add_box</i>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <Logout setIsAuthenticated={this.state.setIsAuthenticated} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
