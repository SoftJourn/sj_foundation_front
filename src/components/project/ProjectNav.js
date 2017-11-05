import React, { Component } from 'react';
import { Link } from 'react-router';
import TabButton from '../tab/TabButton';

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
      author: props.author,
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
      <div className="project-nav">
        <div className="row">
          <nav className="container">
            <Link className={(tab === '' || tab == 'overview') && "active"} to={`${mainUrl}overview`}>OVERVIEW</Link>
            <TabButton
              activeTab={tab}
              mainUrl={mainUrl}
              name="attachments"
              label="Attachments"
              count={attachmentsCount}
            />
            <TabButton
              activeTab={tab}
              mainUrl={mainUrl}
              name="comments"
              label="Comments"
              count={commentsCount}
            />
            <TabButton
              activeTab={tab}
              mainUrl={mainUrl}
              name="updates"
              label="Updates"
              count={updatesCount}
            />
            <TabButton
              activeTab={tab}
              mainUrl={mainUrl}
              name="addUpdate"
              label="+add update"
              count={0}
              show={updatesCount == 0 && user.isAdmin}
            />
          </nav>
        </div>
      </div>
    );
  }
}
