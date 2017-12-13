import React, {Component} from 'react';

class Input extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="custom-input">
                <div className="input-label">{this.props.label}</div>
                <input type="text"
                       ref={this.props.value}
                       className={this.props.className}
                       placeholder={this.props.placeholder}/>
            </div>
        )
    }
}

module.exports = Input;