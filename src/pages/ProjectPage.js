import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectBySlug } from '../actions/projectActions';
import moment from 'moment';
import SJCoin from '../components/sjCoin';
import PledgeModal from '../components/PledgeModal';

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
    const data = this.state.project.data;
    if (this.state.project.isFetching) {
      return (<div className="row"><div>loading..</div></div>);
    }
    return (
      <div className="row">
        <div className="col-md-12 project-title">
          <h1 className="text-center">{data.title.rendered}</h1>
        </div>
        <div className="col-md-9 project-content">
          <div dangerouslySetInnerHTML={{__html: data.content.rendered}}/>
        </div>
        <div className="col-md-3 project-sidebar">
          <div>
            <h2>{this.state.project.backers}</h2>
            backers
          </div>
          <div>
            <h2><SJCoin />{this.state.project.pledgeSum}</h2>
            pledged of <b>{data.price}</b> goal
          </div>
          { this.getDaysTogo() ? (
          <div>
            <h2>{this.getDaysTogo()}</h2>
            days to go
          </div>) : null}
          <div className="text-center">
            <br/>
            {/*<a className="btn btn-md btn-success" role="button">Back</a>*/}
            <button type="button" className="btn btn-success btn-lg" data-toggle="modal" data-target="#back-modal">
              Back
            </button>
            <PledgeModal
              dispatch={this.props.dispatch}
              amount={data.price}
              id={data.id}
            />
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