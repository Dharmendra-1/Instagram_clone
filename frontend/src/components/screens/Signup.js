import React from 'react';

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

  requestUrl = 'http://localhost:4000/user';

  createUser(event) {
    event.preventDefault();
    fetch('http://localhost:4000/user/', {
      mode: 'no-cors',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(console.log('success'))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='row'>
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
                className='btn waves-effect waves-light'
                type='submit'
                name='action'
              >
                Submit
                <i className='material-icons right'>send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
