import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import SJCoin from './sjCoin';
import CoinsSum from './helper/CoinsSum';
import DonationModal from './modals/DonationModal';
import {withdrawProject} from '../actions/projectActions';
import classNames from 'classnames';

export default class ProjectGrid extends Component {

  constructor(props) {
    super();
    this.state = {
      id: props.id,
      user: props.user,
      donation: props.donation,
      slug: props.slug,
      title: props.title,
      thumb: props.thumb,
      price: parseInt(props.price),
      canDonateMore: props.canDonateMore,
      canDonate: props.canDonate,
      canWithdraw: props.canWithdraw,
      durationLeft: props.durationLeft,
      commentsCount: props.commentsCount ? props.commentsCount.total_comments : 0,
      categories: props.categories,
      donationType: props.donationType,
      attachments: props.attachments,
      daysRemain: props.daysRemain,
      percent: this.getProjectPledgePercent(props.raised, props.price),
      shortDescription: props.shortDescription,
      supporters: props.supporters,
      raised: props.raised,
      userRaised: props.userRaised,
      isHover: false,
      showDonateModal: false,
      withdraw: props.withdraw,
      donationStatus: props.donationStatus,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      donation: newProps.donation,
      withdraw: newProps.withdraw,
      user: newProps.user,
      slug: newProps.slug,
      title: newProps.title,
      thumb: newProps.thumb,
      price: parseInt(newProps.price),
      canDonateMore: newProps.canDonateMore,
      canDonate: newProps.canDonate,
      canWithdraw: newProps.canWithdraw,
      durationLeft: newProps.durationLeft,
      commentsCount: newProps.commentsCount ? newProps.commentsCount.total_comments : 0,
      categories: newProps.categories,
      donationType: newProps.donationType,
      attachments: newProps.attachments,
      daysRemain: newProps.daysRemain,
      percent: this.getProjectPledgePercent(newProps.raised, newProps.price),
      shortDescription: newProps.shortDescription,
      supporters: newProps.supporters,
      raised: newProps.raised,
      userRaised: newProps.userRaised,
      isHover: false,
      showDonateModal: false,
      donationStatus: newProps.donationStatus,
    });
  }

  getProjectPledgePercent(raised, price) {
    if (raised == 0){
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

  onHover() {
    this.setState({
      isHover: true
    })
  }

  onMouseLeave() {
    this.setState({
      isHover: false
  })
  }

  clickDonate() {
    this.setState({
      showDonateModal: true,
    })
  }

  onCloseDonateModal() {
    this.setState({
      showDonateModal: false,
    })
  }

  projectClick(slug){
    if(!this.state.isHover) {
      browserHistory.push(`/project/${slug}`);
    }
  }

  handleWithdraw() {
    this.props.dispatch(withdrawProject(this.state.id));
  }

  getDonation() {
    const donation = this.state.donation;
    if (donation.length == 0) {
      return null;
    }
    if (donation.donationRequest) {
      return(
        <div className="project-short-overview text-warning">
          pending...
        </div>
      )
    }
    if (donation.donationError) {
      return(
        <div className="project-short-overview text-dange">
          Error donate project! {donation.errorMessage}
        </div>
      )
    }
    return(
      <div className="project-short-overview text-success">
        Success donated <SJCoin /><b>{donation.donationAmount}</b>
      </div>
    )
  }

  getWithdrawInfo() {
    const withdraw = this.state.withdraw;
    if (withdraw.length == 0) {
      return null;
    }
    if (withdraw.request) {
      return(
        <div className="project-short-overview text-warning">
            pending...
        </div>
      )
    }
    if (withdraw.error) {
      return(
        <div className="project-short-overview text-danger">
            Error withdraw project!
        </div>
      )
    }
    return(
      <div className="project-short-overview text-success">
          Success withdraw!
      </div>
    )
  }

  getDonationStatus() {
    switch(this.state.donationStatus) {
      case 'won':
        return <span className="text-success">Won</span>
      case 'lost':
        return <span className="text-warning">Lost</span>
    }
  }


  render() {
    const { slug, donation, donationStatus, canDonate, canWithdraw, percent, price, supporters, raised, userRaised, attachments, commentsCount, donationType, daysRemain, categories, canDonateMore, isHover } = this.state;
    const category = categories.length > 0 ? categories[0].name : '';
    const donationInfo = this.getDonation();
    const withdrawInfo = this.getWithdrawInfo();
    const getDonationStatus = this.getDonationStatus();
    const supportersClass = classNames({'icon-selected': parseInt(userRaised) != 0});
    return(
      <div className="col-xs-12 col-sm-4">
        <DonationModal
          id={this.state.id}
          title={this.state.title}
          dispatch={this.props.dispatch}
          onClose={this.onCloseDonateModal.bind(this)}
          show={this.state.showDonateModal}
          user={this.state.user}
          pledgeSum={raised}
          balance={this.state.user.balance}
          canPledgeMore={canDonateMore}
        />
        <div className="project-grid" >
          <a onClick={this.projectClick.bind(this, slug)} >
            <div className="img" style={{backgroundImage: `url(${this.state.thumb})`}}>
              { (this.state.user.loggedIn && canDonate) &&
                <button onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}
                      onClick={this.clickDonate.bind(this)}
                      className="btn btn-xs btn-default btn-donate project-grid-donate-button">Donate
                </button>
              }
              { (this.state.user.isAdmin && canWithdraw) &&
              <button onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}
                      onClick={this.handleWithdraw.bind(this)}
                      className="btn btn-xs btn-default btn-donate project-grid-donate-button">Withdraw
              </button>
              }
            </div>
          </a>
          <div className="row project-donation-status">
            <div className="col-xs-12">
              <span className="alignleft project-category-name">
                {donationInfo}
                {withdrawInfo}
              </span>
              {(!donationInfo && !withdrawInfo) &&
                <span>
                  <span className="alignleft project-category-name">{category}</span>
                  <span className="alignright">
                    {donationStatus == 'open' ? this.getTimeRemain() : getDonationStatus }
                  </span>
                </span>
              }
            </div>
          </div>
          <Link to={`/project/${slug}`}>
            <h3 className="project-title"><span dangerouslySetInnerHTML={{__html: this.state.title}}/></h3>
          </Link>
          <p className="short-description" dangerouslySetInnerHTML={{__html: this.state.shortDescription}}/>
          <div className="project-grid-bottom">
            { (price > 0 || price !== '') ?
              <div className="progress">
                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                     aria-valuemax="100" style={{width: `${percent}%`}}>
                  <span className="sr-only">{percent}% Complete</span>
                </div>
              </div>
              :
              <div className="progress-empty"></div>
            }
           <div className="project-short-overview">
              <div className="project-grid-icons">
                <span style={{marginRight: '2px'}}><SJCoin /></span>
                <CoinsSum value={raised} short={true}/>{price > 0 && <span>/<CoinsSum value={price} short={true}/>{canDonateMore && <span>+</span>}</span>}
              </div>
              <div className="text-right">
                { commentsCount > 0 && <span><span className="glyphicon glyphicon-comment" aria-hidden="true"></span>{commentsCount}</span> }
                {/*{ attachments.length > 0 && <span><span className="glyphicon glyphicon-file" aria-hidden="true"></span>{attachments.length}</span> }*/}
                { supporters > 0 && <span className={supportersClass}><span className="glyphicon glyphicon-user" aria-hidden="true"></span>{supporters}</span> }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}