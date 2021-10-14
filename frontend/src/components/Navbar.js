import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logout from './screens/Logout';
import { Dropdown } from 'react-bootstrap';

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
        <div className='nav-wrapper'>
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
              <Link to='/createpost'>
                <i className='medium material-icons'>add_box</i>
              </Link>
            </li>
            <li>
              <Dropdown className='drop'>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  <i className='medium material-icons'>account_circle</i>
                </Dropdown.Toggle>
                <Dropdown.Menu className='card'>
                  <Link to='/profile'>Profile</Link>
                  <Link to='#' className='divider' tabIndex='-1' />
                  <Link to='/'>
                    <Logout
                      setIsAuthenticated={this.state.setIsAuthenticated}
                    />
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <div className='search'>
            <link
              href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
              rel='stylesheet'
            />
            <input
              type='text'
              placeholder=' &#xF002; Search'
            />
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
