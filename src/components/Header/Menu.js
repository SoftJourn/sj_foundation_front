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
                <NavLink className={this.state.itemClassName + ' menu-active'} to="/" exact>Home</NavLink>
                <NavLink className={this.state.itemClassName} to="/" exact>How it works</NavLink>
                <NavLink className={this.state.itemClassName} to="/" exact>Projects</NavLink>
                <NavLink className={this.state.itemClassName} to="/" exact>Contact Us</NavLink>
                <NavLink className={this.state.itemClassName} to="/" exact>Login</NavLink>
            </div>
        );
    }
}