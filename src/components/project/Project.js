import React, { Component } from 'react';
import { string, object, number, bool, array, shape } from 'prop-types';
import ProjectNav from './ProjectNav';
import ProjectSideBar from "./ProjectSideBar";
import TabContainer from "../tab/TabContainer";
import CommentBox from "../comment/CommentBox";
import Subscribe from '../layout/_Subscribe';
import StatsWidget from './_StatsWidget';


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
        return (
            <div className="project-page">
                <div className="container-fluid project-heading-wrap">
                    <div className="container project-heading">
                        <div className="row project-sub-menu align-items-center">
                            <div className="col-auto page-nav">Campaign</div>
                            <div className="col-auto page-nav">Documents</div>
                            <div className="col-auto page-nav">Comments</div>
                            <div className="col-auto page-nav">Team</div>
                            <div className="col-auto page-nav">FAQ</div>
                            <div className="col text-right">
                                <button className="btn btn-default btn-rounded">Donate</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-heading text-center">Project title</div>
                        </div>
                        {/*<div className="row">*/}
                            {/*<div className="col text-center">Watch video</div>*/}
                        {/*</div>*/}
                        <div className="row justify-content-center project-image-wrap">
                            <div className="col-auto project-image">
                                <img src="https://x.kinja-static.com/assets/images/logos/placeholders/default.png" alt="Project image"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container project-main-info">
                    <div className="main-info-text">
                        <div className="row text-center">
                            <div className="col">
                                <h2 className="heading">Main Info</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div>
                                    Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                                    Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate.
                                    Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodoLorem ipsum dolor sit amet,consectetur adipiscing elit.
                                    <br/><br/>

                                    Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate.
                                    Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodoLorem ipsum dolor sit amet,consectetur adipiscing elit.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col stat-widget-wrap">
                            <StatsWidget />
                        </div>
                    </div>
                </div>

                <div className="container-fluid project-about-info">
                    <div className="about-info-text">
                        <div className="row text-center">
                            <div className="col">
                                <h2 className="heading">About the project</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div>
                                    Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                                    Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate.
                                    Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodoLorem ipsum dolor sit amet,consectetur adipiscing elit.
                                    <br/><br/>

                                    Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate.
                                    Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodoLorem ipsum dolor sit amet,consectetur adipiscing elit.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container project-team-info">
                </div>


                <Subscribe />

            </div>
        );
    }
}

/*

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

 */