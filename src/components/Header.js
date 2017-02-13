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
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-bar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">SJ Foundation</Link>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse-bar">
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
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-bar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">SJ Foundation</Link>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse-bar">
            <ul className="nav navbar-nav nav-create-project">
              <li><a href="/wp-admin/post-new.php?post_type=project_type">Create project</a></li>
              <li><Link to="/how-it-works">How it works</Link></li>
            </ul>
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