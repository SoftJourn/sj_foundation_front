import React, {PropTypes} from 'react';

class ProjectsList extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="container-fluid block-projects">
                <div className="container">
                    <div className="row heading-projects align-items-center">
                        <h2 className="col text-center">Projects</h2>
                    </div>
                    <div className="row filter-projects align-items-center justify-content-between">
                        <input type="text" className="col-2 input-outline align-self-start" />
                        <div className="col-auto">All</div>
                        <div className="col-auto">Art</div>
                        <div className="col-auto">Design</div>
                        <div className="col-auto">Film&Video</div>
                        <div className="col-auto">Food</div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row grid-projects align-items-center">
                        <div className="card-deck">

                            <div className="card project-card">
                                <img className="card-img-top" src="https://x.kinja-static.com/assets/images/logos/placeholders/default.png" alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-title">Card title</h4>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </div>
                            </div>

                            <div className="card project-card">
                                <img className="card-img-top" src="https://x.kinja-static.com/assets/images/logos/placeholders/default.png" alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-title">Card title</h4>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </div>
                            </div>

                            <div className="card project-card">
                                <img className="card-img-top" src="https://x.kinja-static.com/assets/images/logos/placeholders/default.png" alt="Card image cap"/>
                                <div className="card-body">
                                    <h4 className="card-title">Card title</h4>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Last updated 3 mins ago</small>
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