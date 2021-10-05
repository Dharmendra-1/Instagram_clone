import React from 'react';
import NavBar from './components/Navbar';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from './components/screens/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path='/signup'>
        <Signup />
      </Route>
    </BrowserRouter>
  );
};

export default App;
