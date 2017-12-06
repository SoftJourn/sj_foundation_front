import React, {PropTypes} from 'react';

class ProjectsList extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="container-fluid block-projects">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col text-center text-heading">Projects</div>
                    </div>
                    <div className="row filter-projects align-items-center justify-content-between">
                        <input type="text" className="col-2 input-outline align-self-start" />
                        <div className="col-auto">All</div>
                        <div className="col-auto">Art</div>
                        <div className="col-auto">Design</div>
                        <div className="col-auto">Film&Video</div>
                        <div className="col-auto active">Food</div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row grid-projects align-items-center">
                        <div className="card-deck">

                            <div className="card card-project">
                                <img className="card-img-top" src="https://x.kinja-static.com/assets/images/logos/placeholders/default.png" alt="Card image cap"/>
                                <div className="card-body">
                                    <div className="card-link">Office</div>
                                    <h4 className="card-title">Dim Sirka</h4>
                                    <div className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</div>
                                    <div className="card-link">by John Smith</div>
                                </div>
                                <div className="card-footer">
                                    <div className="card-coins">
                                        <span>10,500</span> of 25,000
                                    </div>
                                    <div className="card-status-bar progress">
                                        <div className="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="row card-stats">
                                        <div className="col">
                                            <div className="card-stats-value">72% </div> funded
                                        </div>
                                        <div className="col">
                                            <div className="card-stats-value">15 </div> investors
                                        </div>
                                        <div className="col">
                                            <div className="card-stats-value">22 </div> hours to go
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card card-project">
                                <img className="card-img-top" src="https://x.kinja-static.com/assets/images/logos/placeholders/default.png" alt="Card image cap"/>
                                <div className="card-body">
                                    <div className="card-link">Office</div>
                                    <h4 className="card-title">Dim Sirka</h4>
                                    <div className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</div>
                                    <div className="card-link">by John Smith</div>
                                </div>
                                <div className="card-footer">
                                    <div className="card-coins">
                                        <span>10,500</span> of 25,000
                                    </div>
                                    <div className="card-status-bar progress">
                                        <div className="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="row card-stats">
                                        <div className="col">
                                            <div className="card-stats-value">72% </div> funded
                                        </div>
                                        <div className="col">
                                            <div className="card-stats-value">15 </div> investors
                                        </div>
                                        <div className="col">
                                            <div className="card-stats-value">22 </div> hours to go
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card card-project">
                                <img className="card-img-top" src="https://x.kinja-static.com/assets/images/logos/placeholders/default.png" alt="Card image cap"/>
                                <div className="card-body">
                                    <div className="card-link">Office</div>
                                    <h4 className="card-title">Dim Sirka</h4>
                                    <div className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</div>
                                    <div className="card-link">by John Smith</div>
                                </div>
                                <div className="card-footer">
                                    <div className="card-coins">
                                        <span>10,500</span> of 25,000
                                    </div>
                                    <div className="card-status-bar progress">
                                        <div className="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="row card-stats">
                                        <div className="col">
                                            <div className="card-stats-value">72% </div> funded
                                        </div>
                                        <div className="col">
                                            <div className="card-stats-value">15 </div> investors
                                        </div>
                                        <div className="col">
                                            <div className="card-stats-value">22 </div> hours to go
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row align-items-center">
                        <h1 className="col text-center">
                            <button className="btn btn-default">Show All</button>
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
}

ProjectsList.propTypes = {};

ProjectsList.defaultProps = {};

export default ProjectsList;