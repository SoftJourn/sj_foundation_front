import React, { Component } from 'react';
import SJCoin from '../sjCoin';
import PledgeInput from '../PledgeInput';
import { Link } from 'react-router'
import { browserHistory } from 'react-router';

export default class ProjectSideBar extends Component {

  constructor(props) {
    super();
    this.state = {
      projectId: props.projectId,
      status: props.status,
      supporters: props.supporters,
      raised: props.raised,
      userRaised: props.userRaised,
      price: props.price,
      canDonateMore: props.canDonateMore,
      durationLeft: props.durationLeft,
      user: props.user,
      showModal: props.showModal,
      canPledge: false,
      donationStatus: props.donationStatus,
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

  getTimeRemain() {
    //in minutes
    const durationLeft = this.state.durationLeft;
    if (durationLeft <= 0) {
      return null;
    } else if (durationLeft < 60) {
      return (
        <div>
          <h2>{durationLeft}</h2>
          minutes remain
        </div>
      )
    } else if (durationLeft < 60*24) {
      return (
        <div>
          <h2>{Math.round(durationLeft/60)}</h2>
          hours remain
        </div>
      );
    }

    return (
      <div>
        <h2>{Math.round(durationLeft/(60*24))}</h2>
        days remain
      </div>
    );

  }

  canPledge() {
    return this.state.status == 'open';
  }

  getStatus() {
    switch (this.state.status) {
      case 'draft':
      case '':
        return 'Draft';
      case 'open':
        return 'Open';
      case 'closed':
        return 'Closed';
    }
    return ''
  }

  render() {
    const {projectId, showModal, status, supporters, donationStatus, canPledge, raised, price, canDonateMore, userRaised, user} = this.state;
    return (
        <div className="col-xs-12 col-sm-4 col-md-3 project-sidebar">
          <div>
            <h2>{supporters}</h2>
            supporters
          </div>
          <div>
            <h2>
              <SJCoin />{raised}
              {
                status != 'not_founded' && userRaised > 0 &&
                <span> ({userRaised})</span>
              }
            </h2>
            donated {price !== '' && <span>of <b>{price}</b> goal {canDonateMore && <span>or more</span>}</span>}
          </div>
          {this.getTimeRemain()}
          { canPledge &&
            <PledgeInput
              dispatch={this.props.dispatch}
              user={user}
              amount={price}
              pledgeSum={raised}
              balance={this.state.user.balance}
              id={projectId}
              show={showModal} />
            }
          {
            !canPledge &&
            <div>
              <h2>{donationStatus.toUpperCase()}</h2>
            </div>
          }
        </div>
    );
  }
}
