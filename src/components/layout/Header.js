import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Menu from './_Menu';

const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

export default class Header extends Component {

  constructor(props) {
    super();
    this.state = {
      user: props.user,
    };
  }

  // TODO: need to use redux state instead of this
  componentDidMount() {
      if (document.location.pathname !== '/') {
          let navbar = document.querySelector('nav.header');
          navbar.classList.add('visible-header');
      }
      window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      user: newProps.user
    });
  }

  handleScroll(event) {
      if (document.location.pathname === '/') {
          let navbar = document.querySelector('nav.header');
          if (window.scrollY > viewportHeight - 100) {
              navbar.classList.add('visible-header');
          } else {
              navbar.classList.remove('visible-header');
          }
      }
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
    // if (!user.loggedIn) {
    //   return this.renderNotLogged();
    // }
    return(
        <nav className="container-fluid header fixed-top">
          <div className="container">
            <div className="row align-items-center header-inner">
              <div className="col-2 sj-logo">
                sj
              </div>
              <div className="col">
                  <Menu className="row menu justify-content-end"
                        itemClassName="col-auto"/>
              </div>
              <div className="col-3 controls">
                <div className="row">
                  <div className="col">
                    <NavLink className="btn btn-rounded" to="/start">Start project</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
    );
  }
}