import React, { Component } from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router';
import ProjectNavLink from './ProjectNavLink';

export default class ProjectNav extends Component {

  constructor(props) {
    super();
    this.state = {
      preview: props.preview,
      tab: props.tab,
      mainUrl: props.mainUrl,
      commentsCount: props.commentsCount,
      attachmentsCount: props.attachmentsCount,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      preview: props.preview,
      tab: props.tab,
      mainUrl: props.mainUrl,
      commentsCount: props.commentsCount,
      attachmentsCount: props.attachmentsCount,
    });
  }

  render() {
    const {preview, mainUrl, attachmentsCount, commentsCount, tab} = this.state;
    return (
      <div className="project-nav">
        <div className="container">
          <nav className="col-md-12">
            <Link className={(tab === '' || tab == 'overview') && "active"} to={`${mainUrl}overview`}>OVERVIEW</Link>
              <ProjectNavLink
                tab={tab}
                mainUrl={mainUrl}
                name="attachments"
                count={attachmentsCount}
              />
              <ProjectNavLink
                tab={tab}
                mainUrl={mainUrl}
                name="comments"
                count={commentsCount}
              />
          </nav>
        </div>
      </div>
    );
  }
}
