import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavBar = () => {
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
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/createpost'>Create Post</Link>
          </li>
          <li>
            <Link
              className='btn waves-effect waves-light #2196f3 blue logout'
              to='/'
              onClick={() => {
                localStorage.clear();
              }}
            >
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
