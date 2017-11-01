import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { getProjectBySlug, getProjectById } from '../actions/projectActions';
import { fetchComments } from '../actions/commentActions';
import { getBalance } from '../actions/userActions';
import moment from 'moment';
import SJCoin from '../components/helper/sjCoin';
import Spinner from '../components/helper/Spinner';
import CommentInput from '../components/comment/CommentInput';
import CommentBox from '../components/comment/CommentBox';
import { browserHistory } from 'react-router';
import * as types from '../ActionTypes';
import ProjectSideBar from '../components/project/ProjectSideBar';
import ProjectNav from '../components/project/ProjectNav';
import TabContainer from '../components/tab/TabContainer';
import Updates from '../components/project/tabs/Updates';
import AddUpdateForm from '../components/forms/AddUpdateForm';
import PledgeInput from '../components/forms/PledgeInput';

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
  }

  componentWillMount() {
    this.props.dispatch({type: types.PROJECT_INIT});
    if (this.state.preview) {
      this.props.dispatch(getProjectById(this.props.routeParams.slug));
    } else {
      this.props.dispatch(getProjectBySlug(this.props.routeParams.slug));
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
    const dueDate = this.state.project.data.dueDate;
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
    const { project, slug, tab, id, preview, user } = this.state;
    const mainUrl = this.getMainUrl();
    const data = project.data;
    if (project.isFetching) {
      return (<div className="project-results text-center"><div style={{marginTop: '100px'}}><Spinner/></div></div>);
    } else if(project.error) {
      return (
        <div className="container">
          <div className="row alert alert-danger">
            Field to load project
          </div>
        </div>
        );
    } else if(preview && !id) {
      return (
        <div className="container">
          <div className="row alert alert-warning">
            Try to save draft for preview
          </div>
        </div>
      );
    }
    return (
      <div className="project-page">
        <div className="project-header">
          <div className="container">
            <div>
              { project.pledgeSuccess &&
                <div className="row alert alert-success">
                  You successfully pledged <b><SJCoin /> {project.pledgeSuccessSum}</b>
                </div>
              }
              { project.pledgeError &&
                <div className="row alert alert-danger">
                  {project.pledgeMessage}
                </div>
              }
              <div className="col-sm-12 project-title">
                <h1 className="text-left">
                  <span dangerouslySetInnerHTML={{__html: data.title}}/>
                </h1>
                <div className="project-author">
                  <span>
                    {/*<Link to={{pathname: '/search', query: {category: data.categories[0].slug} }}>*/}
                      {/*{data.categories[0].name}*/}
                    {/*</Link>*/}
                  </span>
                  { this.state.user.loggedIn && <span>Author: {data.author}</span> }
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-8 col-md-9">
                <div className="img" style={{backgroundImage: `url(${data.thumbUrl})`}}></div>
              </div>
              <ProjectSideBar
                dispatch={this.props.dispatch}
                projectId={data.id}
                status={data.status}
                supporters={data.supporters}
                raised={data.projectStats.raised}
                userRaised={data.userRaised}
                price={data.price}
                canDonateMore={data.canDonateMore}
                durationLeft={data.durationLeft}
                user={user}
                showModal={project.showModal}
                donationStatus={data.donationStatus}
                canDonate={data.canDonate}
              />
            </div>
          </div>
        </div>
        <ProjectNav
          preview={preview}
          mainUrl={mainUrl}
          tab={tab}
          commentsCount={data.commentsCount ? data.commentsCount.total_comments : 0}
          attachmentsCount={0}
          user={user}
          author={data.author}
        />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-9">
              <TabContainer name="overview" show={tab === ''} activeTab={tab}>
                <div className="project-content">
                  <div dangerouslySetInnerHTML={{__html: data.content}}/>
                </div>
                <div className="row">
                  <CommentInput
                    dispatch={this.props.dispatch}
                    postId={id}
                  />
                </div>
              </TabContainer>
              <TabContainer name="attachments" activeTab={tab}>
                {/*<div className=" project-content">*/}
                  {/*{data.attachments.map((attachment) => {*/}
                    {/*return (*/}
                      {/*<div className="col-xs-12 col-sm-3">*/}
                        {/*<div onClick={() => window.open(attachment.url,'_blank')} className="attachment text-center">*/}
                          {/*<div dangerouslySetInnerHTML={{__html: attachment.thumbnail}}/>*/}
                          {/*<div className="caption">*/}
                            {/*<p href={attachment.url} target="_blank" ><b>{attachment.title}</b></p>*/}
                          {/*</div>*/}
                        {/*</div>*/}
                      {/*</div>*/}
                    {/*);*/}
                  {/*})}*/}
                {/*</div>*/}
              </TabContainer>
              <TabContainer name="comments" activeTab={tab}>
                <div className="project-content">
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
                <div className="row project-content">
                  <CommentInput
                    dispatch={this.props.dispatch}
                    postId={id}
                  />
                </div>
              </TabContainer>
              <TabContainer name="updates" activeTab={tab}>
                <div className=" project-content">
                  <Updates mainUrl={mainUrl} updates={data.updates} showAddButton={user.isAdmin} />
                </div>
              </TabContainer>
              <TabContainer name="addUpdate" activeTab={tab}>
                <div className=" project-content">
                  <AddUpdateForm dispatch={this.props.dispatch} projectId={data.id} mainUrl={mainUrl} />
                </div>
              </TabContainer>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-3">
              {/*{ data.canDonate &&*/}
                {/*<PledgeInput*/}
                  {/*dispatch={this.props.dispatch}*/}
                  {/*user={user}*/}
                  {/*amount={data.price}*/}
                  {/*pledgeSum={data.raised}*/}
                  {/*balance={this.state.user.balance}*/}
                  {/*id={data.id}*/}
                  {/*show={project.showModal} />*/}
              {/*}*/}
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