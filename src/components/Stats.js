import React from 'react';


class Stats extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="container-fluid block-info">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col stats-info">
                            <div className="number-info">234</div>
                            projects completed
                        </div>
                        <div className="col stats-info">
                            <div className="number-info">1,235</div>
                            SJ coins is founded
                        </div>
                        <div className="col stats-info">
                            <div className="number-info">72</div>
                            satisfied members
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Stats.propTypes = {};

Stats.defaultProps = {};

export default Stats;
