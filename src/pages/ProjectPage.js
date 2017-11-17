import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectBySlug, getProjectById } from '../actions/projectActions';
import moment from 'moment';
import Spinner from '../components/helper/Spinner';
import * as types from '../ActionTypes';
import Project from "../components/project/Project";

class ProjectPage extends Component {

  constructor(props) {
    super();
    this.state = {
      // tab: props.routeParams.tab ? props.routeParams.tab : '',
      tab: props.match.params.tab,
      slug: props.match.params.slug,
      // slug: props.routeParams.slug,
      project: props.project,
      donation: props.donation,
      user: props.user,
      preview: false,
    };
  }

  componentWillMount() {
    this.props.dispatch({type: types.PROJECT_INIT});
    if (this.state.preview) {
      this.props.dispatch(getProjectById(this.state.slug));
    } else {
      this.props.dispatch(getProjectBySlug(this.state.slug));
    }
  }

  /**
   * new props from redux state
   * @function componentWillReceiveProps
   * @param {object} nextProps - new props for component
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      tab: nextProps.match.params.tab,
      slug: nextProps.match.params.slug,
      user: nextProps.user,
      form: nextProps.form,
      projects: nextProps.projects,
      project: nextProps.project,
      id: nextProps.project.id,
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
    if (this.state.preview) {
      return `/preview/${this.state.id}/`;
    }
    return `/project/${this.state.slug}/`;
  }

  render() {
    const { project, slug, tab, id, preview, user } = this.state;
    const mainUrl = this.getMainUrl();
    const data = project.data;
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
          slug={project.data.slug}
          mainUrl={mainUrl}
          project={project.data}
          projectStats={project.data.projectStats}
          comments={project.data.comments}
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
    projects: state.projects,
    project: state.project,
    user: state.user,
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(ProjectPage);