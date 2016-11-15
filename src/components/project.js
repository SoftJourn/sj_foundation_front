import React, { Component } from 'react';
import { Link } from 'react-router'
import SJCoin from './sjCoin';

export default class Project extends Component {

  constructor(props) {
    super();
    this.state = {
      slug: props.slug,
      title: props.title,
      thumb: props.thumb,
      price: props.price,
      percent: this.getProjectPledgePercent(props.transactions, props.price),
      shortDescription: props.shortDescription,
    };
  }

  getProjectPledgePercent(transactions, price) {
    if (transactions.length == 0 || _.sumBy(transactions, 'amount') == 0){
      return 0;
    }

    return parseInt((_.sumBy(transactions, 'amount')/price)*100);
  }

  render() {
    const { slug, percent, price } = this.state;
    return(
      <div className="col-xs-12 col-sm-4">
        <div className="project-grid">
          <div className="img" style={{backgroundImage: `url(${this.state.thumb})`}}></div>
          <Link to={`/project/${slug}`}>
            <h3 className="project-title">{this.state.title}</h3>
          </Link>
          <p className="short-description" dangerouslySetInnerHTML={{__html: this.state.shortDescription}}/>
          <div className="project-grid-bottom">
            { (price > 0 || price !== '') ? <div className="progress">
              <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                   aria-valuemax="100" style={{width: `${percent}%`}}>
                <span className="sr-only">{percent}% Complete</span>
              </div>
            </div> : <div className="progress-empty"></div>
            }
            <div className="project-short-overview">
              <SJCoin />100/1000
              <span className="glyphicon glyphicon-user" aria-hidden="true"></span>3
              <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>5
              <span className="glyphicon glyphicon-file" aria-hidden="true"></span>2
            </div>
          </div>
        </div>
      </div>
    );
  }
}