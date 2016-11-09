import React, { Component } from 'react';

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <form className="form-signin" name="loginform" id="loginform" action="/wp-login.php" method="post">
            <h2 className="form-signin-heading">Please sign in</h2>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input name="log" type="text" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus={true} />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input name="pwd" type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
            <input type="hidden" name="redirect_to" value="/" />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}