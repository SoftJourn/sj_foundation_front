import React, {PropTypes} from 'react';


class Subscribe extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="container-fluid block-subscribe">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col">
                            <h1>Get Newsletter <br/> today</h1>
                        </div>
                        <div className="col">
                            <div>Interested in receiving our e-mails? Just subscribe </div>
                            <br/>
                            <input type="text" placeholder="you@mail.com"/>
                            <br/>
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