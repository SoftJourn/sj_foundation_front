import React, { Component } from 'react';

export default class Project extends Component {

  constructor(props) {
    super();
    this.state = {
      title: props.title,
      shortDescription: props.shortDescription,
    };
  }

  render() {
    return(
      <div className="col-md-4">
        <h2>{this.state.title}</h2>
        <p dangerouslySetInnerHTML={{__html: this.state.shortDescription}}/>
        <p><a className="btn btn-default" href="#" role="button">View details »</a></p>
      </div>
    );
  }
}