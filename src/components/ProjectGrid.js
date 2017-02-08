import React, { Component } from 'react';
import { Link } from 'react-router'
import SJCoin from './sjCoin';

export default class ProjectGrid extends Component {

  constructor(props) {
    super();
    this.state = {
      slug: props.slug,
      title: props.title,
      thumb: props.thumb,
      price: parseInt(props.price),
      canDonateMore: props.canDonateMore,
      durationLeft: props.durationLeft,
      commentsCount: props.commentsCount,
      categories: props.categories,
      donationType: props.donationType,
      attachments: props.attachments,
      daysRemain: props.daysRemain,
      percent: this.getProjectPledgePercent(props.raised, props.price),
      shortDescription: props.shortDescription,
      supporters: props.supporters,
      raised: props.raised,
    };
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


  render() {
    const { slug, percent, price, supporters, raised, attachments, commentsCount, donationType, daysRemain, categories, canDonateMore } = this.state;
    const category = categories.length > 0 ? categories[0].name : '';
    return(
      <div className="col-xs-12 col-sm-4">
        <div className="project-grid">
          <div className="img" style={{backgroundImage: `url(${this.state.thumb})`}}></div>
          <div className="row project-donation-status">
            <div className="col-xs-12">
              <span className="alignleft project-category-name">{category}</span>
              <span className="alignright">
                {donationType == 'closed' ? 'Donation closed' : this.getTimeRemain()}
              </span>
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
                {raised}{price > 0 && <span>/{price}{canDonateMore && <span>+</span>}</span>}
              </div>
              <div className="text-right">
                { commentsCount > 0 && <span><span className="glyphicon glyphicon-comment" aria-hidden="true"></span>{commentsCount}</span> }
                { supporters > 0 && <span><span className="glyphicon glyphicon-user" aria-hidden="true"></span>{supporters}</span> }
                { attachments.length > 0 && <span><span className="glyphicon glyphicon-file" aria-hidden="true"></span>{attachments.length}</span> }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}