import React, { Component } from 'react';

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <form className="form-signin" name="loginform" id="loginform" action="/wp-login.php" method="post">
            <h2 className="form-signin-heading">Please sign in</h2>
            <label htmlFor="inputEmail" className="sr-only">Username</label>
            <input name="log" type="text" id="inputEmail" className="form-control" placeholder="Username" required="" autoFocus={true} />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input name="pwd" type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
            <input type="hidden" name="redirect_to" value="/" />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            {/*<p>*/}
              {/*<br/>*/}
                {/*<a href="/wp-login.php?action=register">Registration</a> |*/}
                {/*<a href="/wp-login.php?action=lostpassword"> Lost your password?</a>*/}
            {/*</p>*/}
          </form>
        </div>
      </div>
    );
  }
}