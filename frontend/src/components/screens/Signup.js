import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import M from 'materialize-css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '', password: '' };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [name]: value });
  }

  requestUrl = '/user/signup';

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

      if (user) {
        M.toast({
          html: 'Signup successfully',
          classes: '#43a047 green darken-1',
        });
        this.props.history.push('/');
      } else {
        M.toast({
          html: 'Email already exists!',
          classes: '#c62828 red darken-3',
        });
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
                  placeholder='Email'
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
                  placeholder='Full Name'
                  name='firstName'
                  id='firstName'
                  type='text'
                  value={this.state.firstName}
                  onChange={this.handleChange.bind(this)}
                  className='validate'
                />
              </div>
              <div className='input-field col s12'>
                <input
                  placeholder='Username'
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
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className='row card auth-card1'>
          <h5>
            Have an account?<Link to='/'> Log in</Link>
          </h5>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
