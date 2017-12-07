import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { getProjects, getProjectsCategories } from '../../actions/projectActions';

class ProjectsList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(getProjectsCategories());
        this.props.dispatch(getProjects(1, {}));
    }

    render() {
        let projectCards = this.props.projects.data.map((project, index) => {
            // temporary hack, need to remove this 'if' statement:
            if (index > 2) {
                return;
            }

            return (
                <div className="card card-project">
                    <img className="card-img-top" src="https://x.kinja-static.com/assets/images/logos/placeholders/default.png" alt="Card image cap"/>
                    <div className="card-body">
                        <div className="card-link">{project.category.name}</div>
                        <h4 className="card-title">{project.title}</h4>
                        <div className="card-text">{project.shortDescription}</div>
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
            );
        });

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
                            {projectCards}
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

/**
 * map redux state to project page properties
 * @function mapStateToProps
 * @param {object} state - redux state object
 * @param {object} ownProps - redux properties
 */
function mapStateToProps(state, ownProps) {
    return {
        projects: state.projects
    };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(ProjectsList);
