import React, { Component } from 'react';
import { connect } from 'react-redux';
import UnauthorizedMenuItem from './UnauthorizedMenuItem';
import AuthorizedMenuItem from './AuthorizedMenuItem';

class LoginInfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemClassName: props.itemClassName || ''
        }
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <AuthorizedMenuItem />
            )
        } else {
            return (
                <UnauthorizedMenuItem itemClassName={this.state.itemClassName} />
            )
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        loggedIn: state.authentication.isLoggedIn
    }
}

export default connect(mapStateToProps)(LoginInfoItem)
