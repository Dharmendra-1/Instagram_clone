import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class newPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      tokenParam: undefined,
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;

    this.setState({ ...this.state, tokenParam: token });
  }

  changePassword = async (e) => {
    e.preventDefault();

    console.log(this.state.tokenParam);

    try {
      const res = await fetch('http://localhost:4000/user/newPassword', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: this.state.password,
          sentToken: this.state.tokenParam,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.message) {
        alert(data.message);
        this.props.history.push('/');
      } else {
        alert(data.error);
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
          <form onSubmit={(e) => this.changePassword(e)} className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder='Enter new password'
                  id='password'
                  name='password'
                  type='password'
                  value={this.state.password}
                  onChange={(e) =>
                    this.setState({ ...this.state, password: e.target.value })
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
                  Set Password
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

export default withRouter(newPassword);
