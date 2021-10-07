import React from "react";
import { Link } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [name]: value });
  }

  requestUrl = "http://localhost:4000/user/login";

  createUser(event) {
    event.preventDefault();
    fetch(this.requestUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='mycard'>
        <div className='row card auth-card'>
          <h2>Instagram</h2>
          <form onSubmit={this.createUser.bind(this)} className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder="Username or email"
                  type="text"
                  id="lastName"
                  name="lastName"
                  required pattern = "^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|(\d{3}-\d{3}-\d{4})$"
                  value={this.state.lastName}
                  onChange={this.handleChange.bind(this)}
                  className='validate'
                />
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                  className='validate'
                />
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <button
                  className='btn-block btn waves-effect waves-light #2196f3 blue'
                  type='submit'
                  name='action'
                >
                  Log In
                </button>
              </div>
            </div>
            <h4>
              <Link to="/">Forgot password?</Link>
            </h4>
          </form>
        </div>
        <div className='row card auth-card1'>
          <h5>
          Don't have an account?<Link to="/signup"> Sign up</Link>
          </h5>
        </div>
      </div>
    );
  }
}

export default Signin;
