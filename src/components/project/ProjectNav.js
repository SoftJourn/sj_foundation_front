import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import ProjectNavLink from './ProjectNavLink';
import ProjectUpdateButton from './ProjectUpdateButton';

export default class ProjectNav extends Component {

  constructor(props) {
    super();
    this.state = {
      preview: props.preview,
      tab: props.tab,
      mainUrl: props.mainUrl,
      user: props.user,
      commentsCount: props.commentsCount,
      attachmentsCount: props.attachmentsCount,
      updatesCount: props.updatesCount,
      author: props.author
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      preview: props.preview,
      tab: props.tab,
      mainUrl: props.mainUrl,
      user: props.user,
      commentsCount: props.commentsCount,
      attachmentsCount: props.attachmentsCount,
      updatesCount: props.updatesCount,
      author: props.author
    });
  }

  render() {
    const {mainUrl, attachmentsCount, commentsCount, updatesCount, tab, user, author} = this.state;
    return (
      <div className="project-nav" id="project-nav">
        <div className="container">
          <div className="col-md-12">
            <ul className="nav nav-pills" role="tablist">
              <li role="presentation" className={(tab === '' || tab == 'overview') && "active"}>
                <Link to={`${mainUrl}overview`}>OVERVIEW</Link>
              </li>
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
              <ProjectNavLink
                tab={tab}
                mainUrl={mainUrl}
                name="updates"
                count={updatesCount}
              />
              <ProjectUpdateButton
                tab={tab}
                mainUrl={mainUrl}
                name="addUpdate"
                user={user}
                author={author}
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
