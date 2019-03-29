import React from 'react';


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
                        <div className="col sj-logo">
                            sj
                        </div>
                        <div className="col-3 footer-links align-self-end">
                            <div> Contact Us </div>
                            <div> Privacy Policy </div>
                        </div>
                        <div className="col-auto footer-links align-self-end">
                            <div> Slack </div>
                            <div> Workplace </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col copyright">
                            © 2017 Softjourn, Inc. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
