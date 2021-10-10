import React from 'react';
import NavBar from './components/Navbar';
import './index.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Home from './components/screens/Home';
import CreatePost from './components/screens/CreatePost';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false, image: false };
  }

  componentDidMount() {
    this.checkAuthenticated();
  }
  async checkAuthenticated() {
    try {
      const res = await fetch('http://localhost:4000/user/verify', {
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

        <Route exact path='/home'>
          {this.state.isAuthenticated && (
            <NavBar setIsAuthenticated={this.setIsAuthenticated.bind(this)} />
          )}
          {this.state.isAuthenticated && <Home />}
          {!this.state.isAuthenticated && <Redirect to='/' />}
        </Route>

        <Route exact path='/profile'>
          {this.state.isAuthenticated && (
            <NavBar setIsAuthenticated={this.setIsAuthenticated.bind(this)} />
          )}
          {this.state.isAuthenticated && <Profile />}
          {!this.state.isAuthenticated && <Redirect to='/' />}
        </Route>

        <Route exact path='/createpost'>
          {this.state.isAuthenticated && (
            <NavBar setIsAuthenticated={this.setIsAuthenticated.bind(this)} />
          )}
          {this.state.isAuthenticated && <CreatePost />}
          {!this.state.isAuthenticated && <Redirect to='/' />}
        </Route>
        {/* <Route path='*'>errror page</Route> */}
      </BrowserRouter>
    );
  }
}

export default App;
