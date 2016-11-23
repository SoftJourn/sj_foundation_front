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
      price: props.price,
      attachments: props.attachments,
      percent: this.getProjectPledgePercent(props.transactions, props.price),
      shortDescription: props.shortDescription,
      backersCount: this.getBackersCount(props.transactions),
      pledgeSum: this.getPledgeSum(props.transactions),
    };
  }

  getProjectPledgePercent(transactions, price) {
    if (transactions.length == 0 || _.sumBy(transactions, 'amount') == 0){
      return 0;
    }

    return parseInt((_.sumBy(transactions, 'amount')/price)*100);
  }

  getPledgeSum(transactions) {
    return _.sumBy(transactions, 'amount');
  }

  getBackersCount(transactions) {
    var result = _.uniqBy(transactions, 'accountId');
    return result.length;
  }

  render() {
    const { slug, percent, price, pledgeSum, backersCount, attachments } = this.state;
    return(
      <div className="col-xs-12 col-sm-4">
        <div className="project-grid">
          <div className="img" style={{backgroundImage: `url(${this.state.thumb})`}}></div>
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
                <span style={{marginRight: '2px'}}><SJCoin /></span>{pledgeSum}{price && <span>/{price}</span>}
              </div>
              <div className="text-right">
                { backersCount > 0 && <span><span className="glyphicon glyphicon-user" aria-hidden="true"></span>{backersCount}</span> }
                { false && <span><span className="glyphicon glyphicon-comment" aria-hidden="true"></span>0</span> }
                { attachments.length > 0 && <span><span className="glyphicon glyphicon-file" aria-hidden="true"></span>{attachments.length}</span> }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}