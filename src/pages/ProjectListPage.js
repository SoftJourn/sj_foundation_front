import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectGrid from '../components/ProjectGrid';
import CategoriesFilter from '../components/CategoriesFilter';
import { getProjects, fetchProjectCategories } from '../actions/projectActions';
import Spinner from '../components/Spinner';

class ProjectListPage extends Component {

  constructor(props) {
    super();
    const selectedCategory = props.routeParams.category ? props.routeParams.category : '';
    this.state = {
      projects: props.projects,
      selectedCategory,
      page: 1,
    };
    this.handleLoadMore.bind(this);
    props.dispatch(getProjects(1, selectedCategory));
    props.dispatch(fetchProjectCategories());
  }

  /**
   * new props from redux state
   * @function componentWillReceiveProps
   * @param {object} nextProps - new props for component
   */
  componentWillReceiveProps(nextProps) {
    const selectedCategory = nextProps.routeParams.category ? nextProps.routeParams.category : '';
    this.setState({
      user: nextProps.user,
      form: nextProps.form,
      projects: nextProps.projects,
      selectedCategory,
    });
    if (this.state.selectedCategory !== selectedCategory) {
      this.props.dispatch(getProjects(1, selectedCategory));
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
    const {selectedCategory} = this.state;
    return (
      <div className="project-results">
        <div className="project-results-header">
          <div className="container">
            <div className="raw">
              <CategoriesFilter selectedCategory={selectedCategory} categories={categories} dispatch={this.props.dispatch} />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="raw">
            {Object.keys(data).length == 0 && !isFetching &&
              <div className="col-sm-12 text-center"><h4>No results</h4></div>

            }
            {Object.keys(data).map(key => {
              return (
                <ProjectGrid
                  key={data[key].id}
                  slug={data[key].slug}
                  thumb={data[key].thumbnailUrl}
                  title={data[key].title}
                  transactions={data[key].transactions}
                  commentsCount={data[key].commentsCount}
                  price={data[key].price}
                  shortDescription={data[key].shortDescription}
                  attachments={data[key].attachments}
                  donationType={data[key].status}
                  durationLeft={data[key].durationLeft}
                  categories={data[key].categories}
                  canDonateMore={data[key].canDonateMore}
                  supporters={data[key].supporters}
                  raised={data[key].raised}
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
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(ProjectListPage);