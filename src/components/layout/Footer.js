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
            <div className="container-fluid footer">
                <div className="container">
                    <div className="row">
                        <div className="col-2 sj-logo">
                            sj
                        </div>
                        <div className="col footer-links">
                            <div> Contact Us </div>
                            <div> Privacy Policy </div>
                        </div>
                        <div className="col footer-links">
                            <div> Slack </div>
                            <div> Workplace </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col copyright">
                        © 2017 Softjourn, Inc. All rights reserved.
                    </div>
                </div>
            </div>
        )
    }
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;