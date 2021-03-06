import React from 'react';
import NavBar from './components/Navbar';
import './index.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Home from './components/screens/Home';
import Explore from './components/screens/Explore';
import CreatePost from './components/screens/CreatePost';
import UserProfile from './components/screens/UserProfile';
import ResetPassword from './components/screens/ResetPassword';
import NewPassword from './components/screens/NewPassword';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }
  // console.log(this.props.location.pathname); use it

  componentDidMount() {
    this.checkAuthenticated();
  }
  async checkAuthenticated() {
    try {
      const res = await fetch('/user/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();
      parseRes === true
        ? this.setState({ isAuthenticated: true })
        : this.setState({ isAuthenticated: false });
    } catch (err) {
      console.error(err.message);
    }
  }

  setIsAuthenticated(toggle) {
    this.setState({ isAuthenticated: toggle });
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path='/'>
          {!this.state.isAuthenticated ? (
            <Login setIsAuthenticated={this.setIsAuthenticated.bind(this)} />
          ) : (
            <Redirect to='/home' />
          )}
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/resetPassword'>
          <ResetPassword />
        </Route>
        <Route exact path='/newPassword/:token'>
          <NewPassword />
        </Route>

        <Route exact path='/home'>
          {this.state.isAuthenticated && (
            <NavBar setIsAuthenticated={this.setIsAuthenticated.bind(this)} />
          )}

          {this.state.isAuthenticated && <Home />}
          {!this.state.isAuthenticated && <Redirect to='/home' />}
        </Route>

        <Route exact path='/explore'>
          {this.state.isAuthenticated && (
            <NavBar setIsAuthenticated={this.setIsAuthenticated.bind(this)} />
          )}

          {this.state.isAuthenticated && <Explore />}
          {!this.state.isAuthenticated && <Redirect to='/explore' />}
        </Route>

        <Route exact path='/profile'>
          {this.state.isAuthenticated && (
            <NavBar setIsAuthenticated={this.setIsAuthenticated.bind(this)} />
          )}
          {this.state.isAuthenticated && <Profile />}
          {!this.state.isAuthenticated && <Redirect to='/profile' />}
        </Route>

        <Route exact path='/createpost'>
          {this.state.isAuthenticated && (
            <NavBar setIsAuthenticated={this.setIsAuthenticated.bind(this)} />
          )}
          {this.state.isAuthenticated && <CreatePost />}
          {!this.state.isAuthenticated && <Redirect to='/home' />}
        </Route>
        <Route exact path='/profile/user'>
          {this.state.isAuthenticated && (
            <NavBar setIsAuthenticated={this.setIsAuthenticated.bind(this)} />
          )}
          {this.state.isAuthenticated && <UserProfile />}
          {!this.state.isAuthenticated && <Redirect to='/profile/user' />}
        </Route>
        {/* <Route path='*'>errror page</Route> */}
      </BrowserRouter>
    );
  }
}

export default App;
