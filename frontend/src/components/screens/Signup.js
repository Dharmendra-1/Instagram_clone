import React from "react";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", password: "" };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [name]: value });
  }

  requestUrl = "http://localhost:4000/user/signup";

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
              <div className='input-field col s6'>
                <input
                  placeholder='First Name'
                  name='firstName'
                  id='firstName'
                  type='text'
                  value={this.state.firstName}
                  onChange={this.handleChange.bind(this)}
                  className='validate'
                />
              </div>
              <div className='input-field col s6'>
                <input
                  placeholder='Last Name'
                  id='lastName'
                  name='lastName'
                  type='text'
                  value={this.state.lastName}
                  onChange={this.handleChange.bind(this)}
                  className='validate'
                />
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder='email@email.com'
                  id='email'
                  name='email'
                  type='email'
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                  className='validate'
                />
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder='password'
                  id='password'
                  name='password'
                  type='password'
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
                  SignUp
                  <i className='material-icons right'>send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className='row card auth-card1'>
          <h5>
            <Link to='/signin'>Have an account?</Link>
          </h5>
        </div>
      </div>
    );
  }
}

export default Signup;
