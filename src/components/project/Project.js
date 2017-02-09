import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectBySlug, getProjectById } from '../actions/projectActions';
import { fetchComments } from '../actions/commentActions';
import { getBalance } from '../actions/userActions';
import moment from 'moment';
import SJCoin from '../components/sjCoin';
import PledgeInput from '../components/PledgeInput';
import { Link } from 'react-router'
import Spinner from '../components/Spinner';
import CommentInput from '../components/CommentInput';
import CommentBox from '../components/CommentBox';
import { browserHistory } from 'react-router';
import * as types from '../ActionTypes';

class Project extends Component {

  constructor(props) {
    super();
    this.state = {
      project: props.project,
    };
  }

  /**
   * new props from redux state
   * @function componentWillReceiveProps
   * @param {object} nextProps - new props for component
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      project: nextProps.project
    });
  }


  render() {
    return (
      <div className="project-header">
        <div className="container">
          { project.pledgeSuccess &&
          <div className="raw alert alert-success">
            You successfully pledged <b><SJCoin /> {project.pledgeSuccessSum}</b>
          </div>
          }
          { project.pledgeError &&
          <div className="raw alert alert-danger">
            {project.pledgeMessage}
          </div>
          }
          <div className="col-sm-12 project-title">
            <h1 className="text-left">
              <span dangerouslySetInnerHTML={{__html: data.title.rendered}}/>
            </h1>
          </div>
          <div className="col-xs-12 col-sm-8 col-md-9">
            <div className="img" style={{backgroundImage: `url(${data.featured_image_thumbnail_url})`}}></div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3 project-sidebar">
            <div>
              <h2>{project.backers}</h2>
              supporters
            </div>
            <div>
              <h2>
                <SJCoin />{project.pledgeSum}
                {
                  data.status != 'not_founded' && project.accountPledgeSum > 0 &&
                  <span> ({project.accountPledgeSum})</span>
                }
              </h2>
              donated {data.price !== '' && <span>of <b>{data.price}</b> goal {data.api_data.canDonateMore && <span>or more</span>}</span>}
            </div>
            { this.getDaysTogo() > 0 ? (
              <div>
                <h2>{this.getDaysTogo()}</h2>
                days remain
              </div>) : null}
            { this.canPledge() &&
            <PledgeInput
              dispatch={this.props.dispatch}
              amount={data.price}
              pledgeSum={project.pledgeSum}
              balance={this.state.user.balance}
              id={id}
              show={project.showModal} />
            }
            {
              !this.canPledge() &&
              <div>
                <h2>{this.getStatus()}</h2>
              </div>
            }
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