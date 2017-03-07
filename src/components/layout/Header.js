import React, { Component } from 'react';
import { Link } from 'react-router'

export default class Header extends Component {

  constructor(props) {
    super();
    this.state = {
      user: props.user,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      user: newProps.user
    });
  }

  renderNotLogged() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="raw">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">SJ Foundation</Link>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signin">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  render() {
    const {user} = this.state;
    if (!user.loggedIn) {
      return this.renderNotLogged();
    }
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="raw">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">SJ Foundation</Link>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Account <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-header">Your balance: {this.state.user.balance}</li>
                  <li role="separator" className="divider"></li>
                  <li><a href="/wp-admin/profile.php">Profile</a></li>
                  {/*<li><Link to="/transactions">Transactions</Link></li>*/}
                  <li role="separator" className="divider"></li>
                  <li><a href={window.wpApiSettings.logout_link}>Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}