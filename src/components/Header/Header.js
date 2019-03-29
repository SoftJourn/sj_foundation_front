import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Menu from './Menu';
import { connect } from 'react-redux';
import * as types from '../../ActionTypes';

const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        if (document.location.pathname !== '/') {
            this.props.dispatch({
                type: types.TOGGLE_HEADER,
                visibleHeader: true
            });
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        if (document.location.pathname === '/') {
            if (window.scrollY > viewportHeight - 100) {
                this.props.dispatch({
                    type: types.TOGGLE_HEADER,
                    visibleHeader: true
                });
            } else {
                this.props.dispatch({
                    type: types.TOGGLE_HEADER,
                    visibleHeader: false
                });
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
        let visibleHeaderClass = this.props.visibleHeader && 'visible-header';
//        if (!user.loggedIn) {
//           return this.renderNotLogged();
//        }
        return(
            <nav className={"container-fluid header fixed-top " + visibleHeaderClass}>
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
                                    <NavLink className="btn btn-prime" to="/start">Start project</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        projects: state.projects.list,
        visibleHeader: state.header.visibleHeader
    };
}

export default connect(mapStateToProps)(Header)
