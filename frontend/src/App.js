import React from 'react';
import NavBar from './components/Navbar';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Home from './components/screens/Home';

const App = () => {
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
      {/* <Route path='*'>errror page</Route> */}
    </BrowserRouter>
  );
};

export default App;
