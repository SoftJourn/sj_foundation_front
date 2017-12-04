import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectGrid from '../components/project/projectGrid/ProjectGrid';
import { getProjects, fetchProjectCategories } from '../actions/projectActions';
import Spinner from '../components/helper/Spinner';
import ProjectListFilters from '../components/filters/ProjectListFilters';
import _ from 'lodash';
import queryString from 'query-string';

const queryParamNames = ['category', 'type', 'sort'];

class ProjectListPage extends Component {

  constructor(props) {
    super();
    const queryParams = queryString.parse(props.location.search);
    const selectedCategory = queryParams.category ? queryParams.category : '';

    this.state = {
      donation: props.donation,
      projects: props.projects,
      selectedCategory,
      page: 1,
      user: props.user,
      query: _.pick(queryParams, queryParamNames),
    };
    this.handleLoadMore.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchProjectCategories());
    this.props.dispatch(getProjects(1, this.state.query));
  }

  /**
   * new props from redux state
   * @function componentWillReceiveProps
   * @param {object} nextProps - new props for component
   */
  componentWillReceiveProps(nextProps) {
    const queryParams = queryString.parse(nextProps.location.search);
    const selectedCategory = queryParams.category ? queryParams.category : '';
    const newQuery = _.pick(queryParams, queryParamNames);
    const oldQuery = this.state.query;
    this.setState({
      user: nextProps.user,
      form: nextProps.form,
      projects: nextProps.projects,
      selectedCategory,
      donation: nextProps.donation,
      query: newQuery,
    });
    if (!_.isEqual(newQuery, oldQuery)) {
      this.props.dispatch(getProjects(1, newQuery));
      this.setState({ page: 1});
    }
  }

  handleLoadMore() {
    const page = this.state.page + 1;
    this.setState({
      page,
    });
    this.props.dispatch(getProjects(page));
  }

  render() {
    const {pages, data, isFetching, categories } = this.state.projects;
    const {selectedCategory, query} = this.state;
    return (
      <div className="project-results">
        <ProjectListFilters
          selectedCategory={selectedCategory}
          categories={categories}
          query={query}
        />
        <div className="container">
          <div className="row">
            {Object.keys(data).length === 0 && !isFetching &&
              <div className="col-sm-12 text-center"><h4>No results</h4></div>
            }
            {data.length > 0 && data.map(project => {
              return (
                <ProjectGrid
                  id={project.id}
                  dispatch={this.props.dispatch}
                  projectStats={project.projectStats}
                  project={project}
                />
              );
            })}
            <div className="col-sm-12 text-center">
              { pages > this.state.page && !isFetching &&
              <button
                className="btn btn-default"
                onClick={this.handleLoadMore.bind(this)}
              >
                Load more
              </button>}
              {isFetching && <Spinner /> }
            </div>
          </div>
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
    donation: state.donation,
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(ProjectListPage);