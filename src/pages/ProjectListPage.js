import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectGrid from '../components/project/projectGrid/ProjectGrid';
import { getProjects, fetchProjectCategories } from '../actions/projectActions';
import Spinner from '../components/helper/Spinner';
import ProjectListFilters from '../components/filters/ProjectListFilters';
import _ from 'lodash';


const queryInit = {category: '', type: '', sort: ''};

class ProjectListPage extends Component {

  constructor(props) {
    super();

    const selectedCategory = props.routeParams.category ? props.routeParams.category : '';
    this.state = {
      donation: props.donation,
      projects: props.projects,
      selectedCategory,
      page: 1,
      user: props.user,
      query: {...queryInit, ...props.location.query},
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
    const selectedCategory = nextProps.routeParams.category ? nextProps.routeParams.category : '';
    const query = {...queryInit, ...this.state.query};
    const newQuery = {...query, ...nextProps.location.query};
    this.setState({
      user: nextProps.user,
      form: nextProps.form,
      projects: nextProps.projects,
      selectedCategory,
      donation: nextProps.donation,
      query: newQuery,
    });
    if (!_.isEqual(newQuery, query)) {
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

  getProjectDonationById(id) {
    const donations = this.state.donation;
    let returning = [];
    donations.data.map((value) => {
      if (value.donationId == id) {
        returning = value;
      }
    });
    return returning;
  }

  getProjectWithdrawById(id) {
    const withdraws = this.state.donation.withdraw;
    let returning = [];
    withdraws.map((value) => {
      if (value.id == id) {
        returning = value;
      }
    });
    return returning;
  }

  render() {
    const {pages, data, isFetching, categories } = this.state.projects;
    const {projects, selectedCategory, user, query, donation} = this.state;
    const getProjectDonationById = this.getProjectDonationById.bind(this);
    const getProjectWithdrawById = this.getProjectWithdrawById.bind(this);
    return (
      <div className="project-results">
        <ProjectListFilters
          selectedCategory={selectedCategory}
          categories={categories}
          query={query}
        />
        <div className="container">
          <div className="raw">
            {Object.keys(data).length == 0 && !isFetching &&
              <div className="col-sm-12 text-center"><h4>No results</h4></div>
            }
            {data.length > 0 && data.map(project => {
              return (
                <ProjectGrid
                  id={project.id}
                  dispatch={this.props.dispatch}
                  donation={getProjectDonationById(project.id)}
                  withdraw={getProjectWithdrawById(project.id)}
                  key={project.id}
                  user={user}
                  slug={project.slug}
                  thumb={project.thumbUrl}
                  title={project.title}
                  transactions={project.transactions}
                  commentsCount={project.commentsCount}
                  price={project.price}
                  shortDescription={project.shortDescription}
                  attachments={project.attachments}
                  donationType={project.status}
                  durationLeft={project.durationLeft}
                  categories={project.categories}
                  category={project.category}
                  canDonateMore={project.canDonateMore}
                  canDonate={project.canDonate}
                  canWithdraw={project.canWithdraw}
                  supporters={project.supporters}
                  raised={project.projectraised}
                  projectStats={project.projectStats}
                  donationStatus={project.donationStatus}
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