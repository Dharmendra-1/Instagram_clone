import React from "react";
import { Link } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", password: "" };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [name]: value });
  }

  requestUrl = "http://localhost:8000/user";

  createUser(event) {
    event.preventDefault();
    fetch("http://localhost:8000/user/", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(() => console.log("success"))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="mycard">
        <div className="row card auth-card">
          <h2>Instagram</h2>
          <form onSubmit={this.createUser.bind(this)} className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="email@email.com"
                  id="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                  className="validate"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="password"
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                  className="validate"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <button
                  className="btn-block btn waves-effect waves-light #2196f3 blue"
                  type="submit"
                  name="action"
                >
                  Signin
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
            <h5>
              <Link to="/">Forgot password ?</Link>
            </h5>
          </form>
        </div>
        <div className="row card auth-card1">
          <h5>
            <Link to="/signup">Don't have an account?</Link>
          </h5>
        </div>
      </div>
    );
  }
}

export default Signin;
