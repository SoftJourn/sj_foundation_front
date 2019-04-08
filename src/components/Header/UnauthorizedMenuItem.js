import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class UnauthorizedMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemClassName: props.itemClassName
        }
    }

    render() {
        return (
            <NavLink className={this.state.itemClassName} activeClassName="menu-active" to="/login" exact>Login</NavLink>
        )
    }
}

export default UnauthorizedMenuItem;
