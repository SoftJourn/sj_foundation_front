import React, { Component } from 'react';
import { NavLink, browserHistory } from 'react-router-dom'
import SJCoin from '../../helper/sjCoin';
import CoinsSum from '../../helper/CoinsSum';
import { string, object, number, bool, array, shape } from 'prop-types';


export default class ProjectGrid extends Component {


  static propTypes = {
    comments: array,
    project: shape({
      id: number,
      slug: string,
      title: string,
      author: string,
      shortDescription: string,
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
    slug: '',
    donation: 'closed',
    user: {loggedIn: false},
    project: {
      title: '',
      id: 0,
      author: '',
      slug: '',
      price: 0,
      shortDescription: '',
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
      isHover: false,
      percent: this.getProjectPledgePercent(props.projectStats.raised, props.project.price)
    };
  }

  getProjectPledgePercent(raised, price) {
    if (raised === 0){
      return 0;
    }

    return Math.round((raised/price)*100);
  }

  getTimeRemain() {
    //in minutes
    const durationLeft = this.state.durationLeft;
    if (durationLeft <= 0) {
      return null;
    } else if (durationLeft < 60) {
      return <span>{durationLeft} minutes remain</span>
    } else if (durationLeft < 60*24) {
      return <span>{Math.round(durationLeft/60)} hours remain</span>
    }
    return <span>{Math.round(durationLeft/(60*24))} days remain</span>;
  }

  projectClick(slug){
    if(!this.state.isHover) {
      browserHistory.push(`/project/${slug}`);
    }
  }

  getDonationStatus() {
    switch(this.state.project.donationStatus) {
      case 'won':
        return <span className="text-success">Won</span>
      case 'lost':
        return <span className="text-warning">Lost</span>
    }
  }


  render() {
    const { project, projectStats, percent} = this.state;

    return(
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="project-grid" >
          <a onClick={this.projectClick.bind(this, project.id)} >
            <div className="img" style={{backgroundImage: `url(${project.thumbUrl})`}}></div>
          </a>
          <div className="row project-donation-status">
            <div className="col-12">
              <div className="row">
                <span className="col project-category-name">{project.category}</span>
              </div>
            </div>
          </div>
          <NavLink to={`/project/${project.id}`}>
            <h3 className="project-title"><span dangerouslySetInnerHTML={{__html: project.title}}/></h3>
          </NavLink>
          <p className="short-description" dangerouslySetInnerHTML={{__html: project.shortDescription}}/>
          <div className="project-grid-bottom">
            <div className="project-grid-icons">
              <span style={{marginRight: '2px'}}><SJCoin /></span>
              <CoinsSum value={projectStats.raised} short={true}/>{project.price > 0 && <span>/<CoinsSum value={project.price} short={true}/>{project.canDonateMore && <span>+</span>}</span>}
            </div>
            { (project.price > 0 || project.price !== '') ?
              <div className="progress">
                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                     aria-valuemax="100" style={{width: `${percent}%`}}>
                  <span className="sr-only">{percent}% Complete</span>
                </div>
              </div>
              :
              <div className="progress-empty"></div>
            }
            <div className="row">
              <div className="col-4 text-center">
                <div>{ projectStats.supporters }</div>
                <small>Founded</small>
              </div>
              <div className="col-4 text-center">
                <div>{projectStats.supporters}</div>
                <small>supporters</small>
              </div>
              { project.donationStatus === 'open' &&
                <div className="col-4 text-center">
                  <div>0</div>
                  <small className="text-small">Hours to go</small>
                </div>
              }
              {  project.donationStatus !== 'open' &&
                <div className="col-4 text-center">
                  <div>{this.getDonationStatus()}</div>
                  <small className="text-small">Status</small>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}