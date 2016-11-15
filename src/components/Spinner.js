import React, {Component} from 'react';
import Halogen from 'halogen';

export default class Spinner extends Component {
    render() {
        return (
            <div><Halogen.BeatLoader color={'#777'}/></div>
        );
    }
}