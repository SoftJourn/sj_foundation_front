import React, { Component } from 'react';
import { Link } from 'react-router'

export default class Nav extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">SJ Projects</Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse navbar-right">
            <ul className="nav navbar-nav">
              <li><a href="/wp-admin">Profile</a></li>
              <li><a href={`/wp-login.php?action=logout&redirect_to=%2F&_wpnonce=${window.wpApiSettings.nonce}`}>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}