import React, { Component } from 'react';
import { Link } from 'react-router'

export default class Project extends Component {

  constructor(props) {
    super();
    this.state = {
      slug: props.slug,
      title: props.title,
      thumb: props.thumb,
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
    const { slug, percent } = this.state;
    return(
      <div className="col-md-4">
        <div className="project-grid">
          <div className="img" style={{backgroundImage: `url(${this.state.thumb})`}}></div>
          <Link to={`/project/${slug}`}>
            <h3 className="project-title">{this.state.title}</h3>
          </Link>
          <p dangerouslySetInnerHTML={{__html: this.state.shortDescription}}/>
          <div className="project-grid-bottom">
            <div className="progress" style={{height: '10px'}}>
              <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: `${percent}%`}}>
                <span className="sr-only">{percent}% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}