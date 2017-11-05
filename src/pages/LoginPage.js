import React, { Component } from 'react';
import { connect } from 'react-redux';
import {auth} from "../actions/loginActions";

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  onLogin = (e) => {
    e.preventDefault();
    const {username, password} = this.state;
    this.props.dispatch(auth(username, password));
  };

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    const {username, password} = this.state;
    return (
      <div>
        <div className="container">
          <form className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>
            <label htmlFor="inputEmail" className="sr-only">Username</label>
            <input
              value={username}
              type="text"
              id="inputEmail"
              className="form-control"
              placeholder="LDAP Username" required="" autoFocus={true}
              onChange={this.onUsernameChange}
            />
            <label  htmlFor="inputPassword" className="sr-only">Password</label>
            <input
              value={password}
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required=""
              onChange={this.onPasswordChange}
            />
            <button className="btn btn-lg btn-primary btn-block" onClick={this.onLogin} >Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    form: state.form,
  };
}

export default connect(mapStateToProps)(LoginPage);