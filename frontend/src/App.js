import React from 'react';
import NavBar from './components/Navbar';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Login';
import Profile from './components/screens/Profile';
import Home from './components/screens/Home';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/login'>
        <Signin />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
    </BrowserRouter>
  );
};

export default App;
