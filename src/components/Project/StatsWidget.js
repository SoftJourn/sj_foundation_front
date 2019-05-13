import React, {PropTypes} from 'react';


class StatsWidget extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="stat-widget">
                <div className="widget-coins">
                    <span>10,500</span> of 25,000
                </div>
                <div className="widget-status-bar progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="row justify-content-start widget-stats">
                    <div className="col-auto">
                        <div className="widget-value">72% </div> funded
                    </div>
                    <div className="col-auto">
                        <div className="widget-value">15 </div> investors
                    </div>
                    <div className="col-auto">
                        <div className="widget-value">22 </div> hours to go
                    </div>
                </div>
            </div>
        )
    }
}

export default StatsWidget;