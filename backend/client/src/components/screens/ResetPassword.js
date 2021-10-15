import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import M from 'materialize-css';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  resetUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/user/resetPassword', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.state.email }),
      });

      const data = await res.json();

      if (data.error) {
        M.toast({ html: data.error, classes: '#c62828 red darken-3' });
      } else {
        M.toast({
          html: data.message,
          classes: '#43a047 green darken-1',
        });
        this.props.history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className='mycard'>
        <div className='row card auth-card'>
          <h2>Instagram</h2>
          <form onSubmit={(e) => this.resetUser(e)} className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder='Email'
                  type='text'
                  id='email'
                  name='email'
                  required
                  pattern='^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|(\d{3}-\d{3}-\d{4})$'
                  value={this.state.email}
                  onChange={(e) =>
                    this.setState({ ...this.state, email: e.target.value })
                  }
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
                  Reset Password
                </button>
              </div>
            </div>
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

export default withRouter(ResetPassword);
