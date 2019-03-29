import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from '../../ActionTypes';

class LoginForm extends Component {
    constructor(props) {
        super()
    }

    componentDidMount() {
        this.props.dispatch({
            type: types.TOGGLE_HEADER,
            visibleHeader: true
        })
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
    return {
        visibleHeader: state.visibleHeader
    };
}

export default connect(mapStateToProps)(LoginForm)
