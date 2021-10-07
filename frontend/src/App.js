import React from "react";
import NavBar from "./components/Navbar";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from "./components/screens/Signup";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Home from "./components/screens/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <NavBar />
        <Profile />
      </Route>
      <Route path='/home'>
        <NavBar />
        <Home />
      </Route>
    </BrowserRouter>
  );
};

export default App;
