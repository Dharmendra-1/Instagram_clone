import React from 'react';

const Signup = () => {
  return (
    <div class='row'>
      <form action='/signup' method='post' class='col s12'>
        <div class='row'>
          <div class='input-field col s6'>
            <input
              placeholder='first name'
              id='first_name'
              type='text'
              class='validate'
            />
            <label for='first_name'>First Name</label>
          </div>
          <div class='input-field col s6'>
            <input
              placeholder='last name'
              id='last_name'
              type='text'
              class='validate'
            />
            <label for='last_name'>Last Name</label>
          </div>
        </div>
        <div class='row'>
          <div class='input-field col s12'>
            <input
              placeholder='email@email.com'
              id='email'
              type='email'
              class='validate'
            />
            <label for='email'>Email</label>
          </div>
        </div>
        <div class='row'>
          <div class='input-field col s12'>
            <input
              placeholder='password'
              id='password'
              type='password'
              class='validate'
            />
            <label for='password'>Password</label>
          </div>
        </div>

        <div class='row'>
          <div class='input-field col s12'>
            <button
              class='btn waves-effect waves-light'
              type='submit'
              name='action'
            >
              Submit
              <i class='material-icons right'>send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
