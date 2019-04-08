import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userActions } from 'actions/userActions';

class AuthorizedMenuItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.user.username
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    render() {
        return (
            <div className="m-0 p-0">
                <span className="navbar-text mr-2 text-success">Logged in as {this.state.username}</span>
                <button className="btn btn-primary" onClick={this.clickHandler}>Sign out</button>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.authentication.user
    }
}

export default connect(mapStateToProps)(AuthorizedMenuItem);
