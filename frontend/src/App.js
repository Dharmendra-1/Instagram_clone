import React from 'react';
import NavBar from './components/Navbar';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Login';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/login'>
        <Signin />
      </Route>
    </BrowserRouter>
  );
};

export default App;
