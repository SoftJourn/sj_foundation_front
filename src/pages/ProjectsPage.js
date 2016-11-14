import React, { Component } from 'react';
import { connect } from 'react-redux';
import Project from '../components/project';
import { getProjects } from '../components/projects/projects.actions';


class ProjectsPage extends Component {

  constructor(props) {
    super();
    this.state = {
      projects: props.projects,
      page: 1,
    };
    this.handleLoadMore.bind(this);
    props.dispatch(getProjects(1));
  }

  /**
   * new props from redux state
   * @function componentWillReceiveProps
   * @param {object} nextProps - new props for component
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
      form: nextProps.form,
      projects: nextProps.projects,
    });
  }

  handleLoadMore() {
    const page = this.state.page + 1;
    this.setState({
      page,
    });
    this.props.dispatch(getProjects(page));
  }

  render() {
    const {pages, data, isFetching} = this.state.projects;

    return (
      <div className="container project-results">
        {Object.keys(data).map(key => {
          return (
            <Project
              slug={data[key].slug}
              thumb={data[key].featured_image_thumbnail_url}
              title={data[key].title.rendered}
              transactions={data[key].transactions}
              price={data[key].price}
              shortDescription={data[key].excerpt.rendered}
            />
          );
        })}
        <div className="col-sm-12 text-center">
          { pages > this.state.page && !isFetching ? <button
            className="btn"
            onClick={this.handleLoadMore.bind(this)}
          >
            Load more
          </button> : null
          }
          {
            isFetching ? 'loading...' : null
          }
        </div>
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
    user: state.user,
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(ProjectsPage);