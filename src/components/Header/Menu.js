import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            className: props.className || '',
            itemClassName: props.itemClassName || ''
        }
    }

    render() {
        return(
            <div className={this.state.className + ' menu'}>
                <NavLink className={this.state.itemClassName} activeClassName="menu-active" to="/" exact>Home</NavLink>
                <NavLink className={this.state.itemClassName} activeClassName="menu-active" to="/how" exact>How it works</NavLink>
                <NavLink className={this.state.itemClassName} activeClassName="menu-active" to="/projects" exact>Projects</NavLink>
                <NavLink className={this.state.itemClassName} activeClassName="menu-active" to="/contact" exact>Contact Us</NavLink>
                <NavLink className={this.state.itemClassName} activeClassName="menu-active" to="/login" exact>Login</NavLink>
            </div>
        );
    }
}
