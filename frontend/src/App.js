import React from 'react';
import NavBar from './components/Navbar';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Home from './components/screens/Home';
import CreatePost from './components/screens/CreatePost';

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { tog: true };
  // }

  // handleHome = (toggle) => {
  //   this.setState({ tog: toggle });
  // };
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/profile'>
          <NavBar />
          <Profile />
        </Route>
        <Route exact path='/home'>
          <NavBar />
          <Home />
        </Route>
        <Route exact path='/createpost'>
          <NavBar />
          <CreatePost />
        </Route>
        {/* <Route path='*'>errror page</Route> */}
      </BrowserRouter>
    );
  }
}

export default App;
