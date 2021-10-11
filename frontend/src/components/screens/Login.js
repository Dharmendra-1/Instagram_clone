import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    const { setIsAuthenticated } = this.props;

    this.state = {
      email: '',
      password: '',
      setIsAuthenticated,
    };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [name]: value });
  }

  requestUrl = 'http://localhost:4000/user/login';

  createUser = async (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };

    try {
      const res = await fetch(this.requestUrl, options);
      const user = await res.json();

      if (user.jwtToken) {
        localStorage.setItem('token', user.jwtToken);
        this.props.history.push('/home');
        this.state.setIsAuthenticated(true);
      } else {
        alert('Invalid login credentials!');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    return (
      <div className='mycard'>
        <div className='row card auth-card'>
          <h2>Instagram</h2>
          <form onSubmit={this.createUser.bind(this)} className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder='Username or email'
                  type='text'
                  id='email'
                  name='email'
                  required
                  pattern='^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|(\d{3}-\d{3}-\d{4})$'
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                  className='validate'
                />
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder='Password'
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
                  Log In
                </button>
              </div>
            </div>
            <h4>
              <Link to='/'>Forgot password?</Link>
            </h4>
          </form>
        </div>
        <div className='row card auth-card1'>
          <h5>
            Don't have an account?<Link to='/signup'> Sign up</Link>
          </h5>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
