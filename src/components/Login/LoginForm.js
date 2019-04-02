import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withHeader } from 'components/Header/HeaderDecorator';

class LoginForm extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <div>
                Hello from Login Form
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export default connect(mapStateToProps)(withHeader(LoginForm))
