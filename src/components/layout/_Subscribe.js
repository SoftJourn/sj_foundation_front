import React, {PropTypes} from 'react';


class Subscribe extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="container-fluid block-subscribe">
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col">
                            <div className="title-subscribe">Get Newsletter <br/> today</div>
                        </div>
                        <div className="col block-subscribe-form">
                            <div>Interested in receiving our e-mails? Just subscribe </div>
                            <input type="text" placeholder="you@mail.com"/> <br/>
                            <button className="btn btn-rounded">Start project</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Subscribe.propTypes = {};

Subscribe.defaultProps = {};

export default Subscribe;