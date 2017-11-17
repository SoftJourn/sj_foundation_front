import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

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
      <nav className="navbar navbar-light">
        <NavLink className="navbar-brand" to="/">SJ Foundation</NavLink>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/signin">Login</NavLink>
          </li>
        </ul>
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
            <NavLink className="navbar-brand" to="/">SJ Foundation</NavLink>
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