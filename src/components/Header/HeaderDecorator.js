import React, { Component } from 'react';
import { headerActions } from 'actions/headerActions';

export const withHeader = (WrappedComponent) => {
    return class extends Component {
        componentDidMount() {
            this.props.dispatch(headerActions.show());
        }

        render() {
            return (
                <WrappedComponent />
            )
        }
    }
}
