import React, { Component } from 'react';
import { string } from 'prop-types';

export default class LoginForm extends Component {


  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
    });
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
      <div className="row justify-content-md-center">
        <form className="col-12 col-sm-12 col-md-10 col-lg-8">
          <div className="text-center">
            <h1 className="form-signin-heading">Please sign in</h1>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail">LDAP Username</label>
            <input
              value={username}
              type="text"
              id="inputEmail"
              className="form-control"
              placeholder="LDAP Username" required="" autoFocus={true}
              onChange={this.onUsernameChange}
            />
          </div>
          <div className="form-group">
           <label  htmlFor="inputPassword">Password</label>
            <input
              value={password}
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required=""
              onChange={this.onPasswordChange}
            />
          </div>
          <div className="form-group text-center">
            <button className="btn btn-primary" onClick={this.onLogin} >Sign in</button>
          </div>
        </form>
      </div>
    );
  }
}
