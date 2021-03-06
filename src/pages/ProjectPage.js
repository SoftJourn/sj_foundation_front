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
import ProjectSideBar from '../components/project/ProjectSideBar';
import ProjectNav from '../components/project/ProjectNav';

class ProjectPage extends Component {

  constructor(props) {
    super();
    this.state = {
      tab: props.routeParams.tab ? props.routeParams.tab : '',
      slug: props.routeParams.slug,
      project: props.project,
      donation: props.donation,
      user: props.user,
      preview: props.route.preview,
    };
    props.dispatch({type: types.PROJECT_INIT});
    if (this.state.preview) {
      props.dispatch(getProjectById(props.routeParams.slug));
    } else {
      props.dispatch(getProjectBySlug(props.routeParams.slug));
    }
  }

  /**
   * new props from redux state
   * @function componentWillReceiveProps
   * @param {object} nextProps - new props for component
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      slug: nextProps.routeParams.slug,
      tab: nextProps.routeParams.tab ? nextProps.routeParams.tab : '',
      user: nextProps.user,
      form: nextProps.form,
      projects: nextProps.projects,
      project: nextProps.project,
      id: nextProps.project.data.id,
      donation: nextProps.donation,
    });
    if (this.state.project.commentSuccess === false && nextProps.project.commentSuccess === true) {
      this.props.dispatch(getProjectBySlug(this.props.routeParams.slug));
      this.props.dispatch(fetchComments(nextProps.project.data.id));
      const mainUrl = this.getMainUrl();
      browserHistory.push(`${mainUrl}comments`);
    }
    if (nextProps.project.data.id && nextProps.project.data.id !== this.state.id) {
      this.props.dispatch(fetchComments(nextProps.project.data.id));
    }
    if (nextProps.routeParams.slug !== this.state.slug) {
      this.props.dispatch(getProjectBySlug(nextProps.routeParams.slug));
    }
    if (nextProps.project.pledgeSuccess && this.state.project.pledgeSuccess !== nextProps.project.pledgeSuccess ) {
      this.props.dispatch(getProjectBySlug(nextProps.routeParams.slug));
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

  canPledge() {
    return this.state.project.data.donation_type === 'open';
  }

  getStatus() {
    switch (this.state.project.data.status) {
      case 'founded':
        return 'Won';
      case 'not_founded':
        return 'Lost'
    }
  }

  getMainUrl() {
    if (this.state.preview) {
      return `/preview/${this.state.id}/`;
    }
    return `/project/${this.state.slug}/`;
  }

  render() {
    const { project, slug, tab, id, preview } = this.state;
    const mainUrl = this.getMainUrl();
    const data = project.data;
    if (project.isFetching) {
      return (<div className="project-results text-center"><div style={{marginTop: '100px'}}><Spinner/></div></div>);
    } else if(project.error) {
      return (
        <div className="container">
          <div className="raw alert alert-danger">
            Field to load project
          </div>
        </div>
        );
    } else if(preview && !id) {
      return (
        <div className="container">
          <div className="raw alert alert-warning">
            Try to save draft for preview
          </div>
        </div>
      );
    }
    return (
      <div className="project-page">
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
                <span dangerouslySetInnerHTML={{__html: data.title}}/>
              </h1>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-9">
              <div className="img" style={{backgroundImage: `url(${data.thumbnailUrl})`}}></div>
            </div>
            <ProjectSideBar
              dispatch={this.props.dispatch}
              projectId={data.id}
              status={data.status}
              supporters={data.supporters}
              raised={data.raised}
              userRaised={data.userRaised}
              price={data.price}
              canDonateMore={data.canDonateMore}
              durationLeft={data.durationLeft}
              user={this.state.user}
              showModal={project.showModal}
              donationStatus={data.donationStatus}
              canDonate={data.canDonate}
            />
          </div>
        </div>
        <ProjectNav
          preview={preview}
          mainUrl={mainUrl}
          tab={tab}
          commentsCount={data.commentsCount ? data.commentsCount.total_comments : 0}
          attachmentsCount={data.attachments.length}
        />
        <div className="container">
          {
            (tab === '' || tab === 'overview') &&
            <div className="col-md-12">
              <div className="project-content">
                <div dangerouslySetInnerHTML={{__html: data.content}}/>

              </div>
              { this.state.user.loggedIn &&
              <p className="text-right">
                <small>Author: {data.author}</small>
              </p>
              }
            </div>
          }
          {
            (tab == 'attachments') &&
            <div className="raw project-content">
              {data.attachments.map((attachment) => {
                return (
                  <div className="col-xs-12 col-sm-3">
                    <div onClick={() => window.open(attachment.url,'_blank')} className="attachment text-center">
                      <div dangerouslySetInnerHTML={{__html: attachment.thumbnail}}/>
                      <div className="caption">
                        <p href={attachment.url} target="_blank" ><b>{attachment.title}</b></p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          }
          {
            (tab == 'comments' && !preview) &&
            <div className="project-footer">
              <div className="container">
                <div className="raw project-content">
                  {project.comments.map((comment) => {
                    return (
                      <CommentBox
                        key={comment.id}
                        comment={comment}
                        isNew={project.newCommentId === comment.id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          }
        </div>
        <div className="project-footer">
          <div className="container">
            {(!preview && this.state.user.loggedIn) &&
              <div className="raw">
                <div className="">
                  <CommentInput
                    dispatch={this.props.dispatch}
                    postId={id}
                  />
                </div>
                <div className="col-xs-12">
                  <nav>
                    <ul className="pager">
                      { data.prev_project && <li className="previous"><Link to={`/project/${data.prev_project}`}><span aria-hidden="true">&larr;</span> Previous project</Link></li>}
                      { data.next_project &&  <li className="next"><Link to={`/project/${data.next_project}`}>Next project <span aria-hidden="true">&rarr;</span></Link></li>}
                    </ul>
                  </nav>
                </div>
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