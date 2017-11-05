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
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-sm-12">
                            <h5>SJ Foundation</h5>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col-sm-12 col-md-auto">
                                    <a href={'#'}>Start Project</a>
                                </div>
                                <div className="col-sm-12 col-md-auto">
                                    <a href={'#'}>Projects</a>
                                </div>
                                <div className="col-sm-12 col-md-auto">
                                    <a href={'#'}>How it works</a>
                                </div>
                                <div className="col-sm-12 col-md-auto">
                                    <a href={'#'}>Contact Us</a>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-12 col-lg-4 text-lg-right">
                            sj-foundation@softjourn.com
                        </div>
                    </div>
                    <div className="row copyright-row">
                        <div className="col">
                            2017 SOFTJOURN INC.
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