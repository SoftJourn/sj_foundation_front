import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectById } from 'actions/projectActions';
import moment from 'moment';
import { withHeader } from 'components/HOC/HeaderDecorator';
import Spinner from 'components/helper/Spinner';
import { PROJECT_INIT } from 'ActionTypes';
import Project from "components/Project/Project";

class ProjectPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: props.match.params.tab,
      projectId: props.match.params.projectId,
      project: props.project,
      donation: props.donation,
      user: props.user
    };
  }

  componentWillMount() {
    this.props.dispatch({type: PROJECT_INIT});
    this.props.dispatch(getProjectById(this.state.projectId));
  }

  /**
   * new props from redux state
   * @function componentWillReceiveProps
   * @param {object} nextProps - new props for component
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      tab: nextProps.match.params.tab,
      user: nextProps.user,
      form: nextProps.form,
      project: nextProps.project,
      projectId: nextProps.project.id,
      donation: nextProps.donation,
    });
  }

  getDaysTogo() {
    const dueDate = this.state.project.data.dueDate;
    if (!dueDate) {
      return false;
    }
    const a = moment(this.state.project.data.due_date, 'YYYY-MM-DD');
    const b = moment();
    return a.diff(b, 'days');
  }

  getStatus() {
    switch (this.state.project.data.status) {
      case 'founded':
        return 'Won';
      case 'not_founded':
        return 'Lost';
      default :
        return 'Closed';
    }
  }

  getMainUrl() {
      return `/preview/${this.state.projectId}/`;
  }

  render() {
    const { project, user } = this.state;
    const mainUrl = this.getMainUrl();

    if (project.isFetching) {
      return (<div className="project-results text-center"><div style={{marginTop: '100px'}}><Spinner/></div></div>);
    } else if(project.error) {
      return (
        <div className="container">
          <div className="row text-center">
            Field to load project
          </div>
        </div>
        );
    }
    return (
      <div>
        <Project
          title={project.data.title}
          thumbUrl={project.data.thumbUrl}
          content={project.data.content}
        />
      </div>
    );
  }
}

/**
 * map redux state to project page properties
 * @function mapStateToProps
 * @param {object} state - redux state object
 * @param {object} ownProps - redux properties
 */
function mapStateToProps(state, ownProps) {
  return {
    form: state.form,
    project: state.projects.project,
    user: state.user,
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(withHeader(ProjectPage));
