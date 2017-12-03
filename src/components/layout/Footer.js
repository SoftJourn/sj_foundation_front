import React, {PropTypes} from 'react';


class Footer extends React.Component {

    constructor(props) {
        super();
        this.state = {
            categories: props.categories
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            categories: newProps.categories
        });
    }


    render() {
        return (
            <div>Footer</div>
        )
    }
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;