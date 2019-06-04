import React, { Component } from 'react';
import { withHeader } from 'components/HOC/HeaderDecorator';
import { connect } from 'react-redux';

class PrivatePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Hello from Private Page
            </div>
        )
    }
}

export default connect()(withHeader(PrivatePage));
