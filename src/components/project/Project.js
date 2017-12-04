import React, { Component } from 'react';
import { string, object, number, bool, array, shape } from 'prop-types';
import ProjectNav from './ProjectNav';
import ProjectSideBar from "./ProjectSideBar";
import TabContainer from "../tab/TabContainer";
import CommentBox from "../comment/CommentBox";

export default class Project extends Component {


  static propTypes = {
    user: object,
    tab: string,
    mainUrl: string,
    comments: array,
    project: shape({
      id: number,
      slug: string,
      title: string,
      author: string,
    }),
    projectStats: shape({
      supporters: number,
      raised: number,
      status: string,
      canPledge: bool,
      donationStatus: string
    }),
  };

  static defaultProps = {
    tab: 'overview',
    slug: '',
    donation: 'closed',
    user: {loggedIn: false},
    preview: '',
    mainUrl: '',
    comments: [],
    project: {
      title: '',
      id: 0,
      author: '',
      slug: '',
      price: 0,
      content: '',
    },
    projectStats: {
      supporters: 0,
      raised: 0,
      status: 'Closed',
      canPledge: false,
      donationStatus: 'Closed'
    },
  };


  constructor(props) {
    super(props);
    this.state = {
      project: props.project,
      projectStats: props.projectStats,
      user: props.user,
      comments: props.comments,
      tab: props.tab,
      donationStatus: props.donationStatus,
    };
  }



  componentWillReceiveProps(nextProps) {
    this.setState({
      project: nextProps.project,
      projectStats: nextProps.projectStats,
      user: nextProps.user,
      comments: props.comments,
    });
  }


  render() {
    const { project, projectStats, comments, tab, preview, user, mainUrl} = this.state;
    return (
      <div className="project-page">
        <div className="project-header">
          <div className="container">
            <div>
              <div className="col-sm-12 project-title">
                <h1 className="text-left">
                  <span dangerouslySetInnerHTML={{__html: project.title}}/>
                </h1>
                <div className="project-author">
                  { this.state.user.loggedIn && <span>Author: {project.author}</span> }
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-12">
                <div className="img" style={{backgroundImage: `url(${project.thumbUrl})`}}></div>
              </div>
            </div>
            <div className="">
              <ProjectSideBar
                dispatch={this.props.dispatch}
                projectId={project.id}
                status={project.status}
                supporters={projectStats.supporters}
                raised={projectStats.raised}
                price={project.price}
                canDonateMore={project.canDonateMore}
                durationLeft={projectStats.durationLeft}
                user={user}
                showModal={project.showModal}
                donationStatus={projectStats.donationStatus}
                canDonate={projectStats.canDonate}
              />
            </div>
          </div>
        </div>
        <ProjectNav
          preview={preview}
          mainUrl={mainUrl}
          tab={tab}
          commentsCount={0}
          attachmentsCount={0}
          user={user}
          author={project.author}
        />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <TabContainer name="overview" show={tab === ''} activeTab={tab}>
                <div className="project-content">
                  <div dangerouslySetInnerHTML={{__html: project.content}}/>
                </div>
              </TabContainer>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {comments.length > 0 && <h4 className="text-center">Comments</h4> }
              {comments.map((comment) => {
                return (
                  <CommentBox
                    key={comment.id}
                    comment={comment}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
