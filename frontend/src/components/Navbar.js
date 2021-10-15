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
      searchInput: '',
      userData: [],
      loginId: '',
    };
  }

  getUser = async () => {
    try {
      const res = await fetch('http://localhost:4000/user');
      const parseData = await res.json();
      parseData.sort((a, b) => (a.pid < b.pid ? 1 : -1));
      this.setState({ userData: parseData });
    } catch (err) {
      console.error(err.message);
    }
  };

  loginUserId = async () => {
    try {
      const res = await fetch('http://localhost:4000/dashboard/', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      this.setState({
        loginId: parseData.id,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  handleUserProfile = (id) => {
    if (this.state.loginId !== id) localStorage.setItem('userId', id);
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div className='navbar-fixed'>
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
                <Link to='/explore'>
                  <i className='medium material-icons'>explore</i>
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

              <Dropdown className='drop'>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  <input
                    type='text'
                    placeholder='&#xF002; Search '
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        searchInput: e.target.value,
                      });
                    }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className='card'>
                  {this.state.userData
                    .filter((obj) => {
                      if (this.state.searchInput === '') {
                        return null;
                      } else if (
                        obj.last_name
                          .toLowerCase()
                          .includes(this.state.searchInput.toLowerCase())
                      ) {
                        return obj;
                      }
                      return null;
                    })
                    .map((obj) => {
                      return (
                        <li
                          key={obj.id}
                          onClick={() => {
                            this.handleUserProfile(obj.id);
                          }}
                        >
                          <Link to='/profile/user'>{obj.last_name}</Link>
                        </li>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
