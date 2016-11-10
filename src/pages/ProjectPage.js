import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectBySlug } from '../actions/projectActions';
import { getBalance } from '../actions/userActions';
import moment from 'moment';
import SJCoin from '../components/sjCoin';
import PledgeModal from '../components/PledgeModal';
import { SHOW_PLEDGE_MODAL } from '../ActionTypes';

class ProjectPage extends Component {

  constructor(props) {
    super();
    this.state = {
      slug: props.routeParams.slug,
      project: props.project,
    };
    props.dispatch(getProjectBySlug(props.routeParams.slug));
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
      project: nextProps.project,
    });
    if (nextProps.project.pledgeSuccess && this.state.project.pledgeSuccess !== nextProps.project.pledgeSuccess ) {
      this.props.dispatch(getProjectBySlug(nextProps.project.data.slug));
      this.props.dispatch(getBalance());
    }
  }


  getDaysTogo() {
    const dueDate = this.state.project.data.due_date;
    if (!dueDate) {
      return false;
    }
    var a = moment(this.state.project.data.due_date, 'YYYY-MM-DD');
    var b = moment();
    return a.diff(b, 'days');
  }

  render() {
    const { project } = this.state;
    const data = project.data;
    if (project.isFetching) {
      return (<div className="container"><div className="row"><div>loading..</div></div></div>);
    }
    return (
      <div className="row">
        <div className="project-header">
          <div className="container">
            {project.pledgeSuccess ?
              <div className="alert alert-success" role="alert">Success! You successfully pledged.</div> : null
            }
            <div className="col-sm-12 project-title">
              <h1 className="text-left">{data.title.rendered}</h1>
            </div>
            <div className="col-md-9">
              <div className="img" style={{backgroundImage: `url(${data.featured_image_thumbnail_url})`}}></div>
            </div>
            <div className="col-md-3 project-sidebar">
              <div>
                <h2>{project.backers}</h2>
                backers
              </div>
              <div>
                <h2><SJCoin />{project.pledgeSum}</h2>
                pledged of <b>{data.price}</b> goal
              </div>
              { this.getDaysTogo() ? (
                <div>
                  <h2>{this.getDaysTogo()}</h2>
                  days to go
                </div>) : null}
              <div className="text-left">
                <br/>
                <button type="button" className="btn btn-primary" onClick={() => this.props.dispatch({type: SHOW_PLEDGE_MODAL})}>
                  Pledge
                </button>
                <PledgeModal
                  dispatch={this.props.dispatch}
                  amount={data.price}
                  id={data.id}
                  show={project.showModal}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="project-nav">
          <div className="container">
            <div className="col-md-12">
              <ul className="nav nav-pills" role="tablist">
                <li role="presentation" className="active"><a href="#">Overview</a></li>
                <li role="presentation"><a href="#">Comments <span className="badge">0</span></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-md-12">
            <div className=" project-content">
              <div dangerouslySetInnerHTML={{__html: data.content.rendered}}/>
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
    project: state.project,
    user: state.user,
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(ProjectPage);