import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjectBySlug } from '../actions/projectActions';
import { fetchComments } from '../actions/commentActions';
import { getBalance } from '../actions/userActions';
import moment from 'moment';
import SJCoin from '../components/sjCoin';
import PledgeModal from '../components/PledgeModal';
import { SHOW_PLEDGE_MODAL } from '../ActionTypes';
import { Link } from 'react-router'
import Spinner from '../components/Spinner';
import CommentInput from '../components/CommentInput';
import CommentBox from '../components/CommentBox';
import { browserHistory } from 'react-router';

class ProjectPage extends Component {

  constructor(props) {
    super();
    this.state = {
      tab: props.routeParams.tab ? props.routeParams.tab : '',
      slug: props.routeParams.slug,
      project: props.project,
      id: 0,
    };
    props.dispatch(getProjectBySlug(props.routeParams.slug));
  }

  /**
   * new props from redux state
   * @function componentWillReceiveProps
   * @param {object} nextProps - new props for component
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      slug: nextProps.routeParams.slug,
      tab: nextProps.routeParams.tab ? nextProps.routeParams.tab : '',
      user: nextProps.user,
      form: nextProps.form,
      projects: nextProps.projects,
      project: nextProps.project,
      id: nextProps.project.data.id,
    });
    if (this.state.project.commentSuccess === false && nextProps.project.commentSuccess === true) {
      this.setState({});
      this.props.dispatch(fetchComments(nextProps.project.data.id));
      const mainUrl = this.getMainUrl();
      browserHistory.push(`${mainUrl}comments`);
    }
    if (nextProps.project.data.id !== this.state.id) {
      this.props.dispatch(fetchComments(nextProps.project.data.id));
    }
    if (nextProps.routeParams.slug !== this.state.slug) {
      this.props.dispatch(getProjectBySlug(nextProps.routeParams.slug));
    }
    if (nextProps.project.pledgeSuccess && this.state.project.pledgeSuccess !== nextProps.project.pledgeSuccess ) {
      this.props.dispatch(getProjectBySlug(nextProps.project.data.slug));
      this.props.dispatch(getBalance());
    }
  }

  getDaysTogo() {
    const dueDate = this.state.project.data.due_date;
    if (!dueDate) {
      return false;
    }
    var a = moment(this.state.project.data.due_date, 'YYYY-MM-DD');
    var b = moment();
    return a.diff(b, 'days');
  }

  getMainUrl() {
    return `/project/${this.state.slug}/`;
  }

  render() {
    const { project, slug, tab, id } = this.state;
    const mainUrl = `/project/${slug}/`;
    const data = project.data;
    if (project.isFetching) {
      return (<div className="project-results text-center"><div style={{marginTop: '100px'}}><Spinner/></div></div>);
    }
    return (
      <div className="project-page">
        <div className="project-header">
          <div className="container">
            {data.user_transactions.map((transaction) => {
              return (
                <div className="raw alert alert-success">
                  You successfully pledged {transaction.amount}
                </div>
              );
            })}
            <div className="col-sm-12 project-title">
              <h1 className="text-left">{data.title.rendered}</h1>
            </div>
            <div className="col-xs-12 col-sm-9">
              <div className="img" style={{backgroundImage: `url(${data.featured_image_thumbnail_url})`}}></div>
            </div>
            <div className="col-xs-12 col-sm-3 project-sidebar">
              <div>
                <h2>{project.backers}</h2>
                backers
              </div>
              <div>
                <h2><SJCoin />{project.pledgeSum}</h2>
                pledged {data.price !== '' && <span>of <b>{data.price}</b> goal</span>}
              </div>
              { this.getDaysTogo() ? (
                <div>
                  <h2>{this.getDaysTogo()}</h2>
                  days to go
                </div>) : null}
              <div className="text-left">
                <br/>
                <button type="button" className="btn btn-primary" onClick={() => this.props.dispatch({type: SHOW_PLEDGE_MODAL})}>
                  Pledge
                </button>
                <PledgeModal
                  dispatch={this.props.dispatch}
                  amount={data.price}
                  id={id}
                  show={project.showModal}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="project-nav" id="project-nav">
          <div className="container">
            <div className="col-md-12">
              <ul className="nav nav-pills" role="tablist">
                <li role="presentation" className={(tab === '' || tab == 'overview') && "active"}><Link to={`${mainUrl}overview`}>Overview</Link></li>
                {data.attachments.length > 0 && (<li role="presentation" className={tab == 'attachments' && "active"}><Link to={`${mainUrl}attachments`}>Attachments <span className="badge">{data.attachments.length}</span></Link></li>)}
                <li className={tab == 'comments' && "active"} role="presentation"><Link to={`${mainUrl}comments`}>Comments <span className="badge">{project.comments.length}</span></Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          {
            (tab === '' || tab === 'overview') &&
            <div className="col-md-12">
              <div className="project-content">
                <div dangerouslySetInnerHTML={{__html: data.content.rendered}}/>
              </div>
            </div>
          }
          {
            (tab == 'attachments') &&
            <div className="raw project-content">
              {data.attachments.map((attachment) => {
                return (
                  <div className="col-xs-12 col-sm-3">
                    <div onClick={() => window.open(attachment.url,'_blank')} className="attachment text-center">
                      <div dangerouslySetInnerHTML={{__html: attachment.thumbnail}}/>
                      <div className="caption">
                        <p href={attachment.url} target="_blank" ><b>{attachment.title}</b></p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          }
          {
            (tab == 'comments') &&
            <div className="project-footer">
              <div className="container">
                <div className="raw project-content">
                  {project.comments.map((comment) => {
                    return (
                      <CommentBox
                        key={comment.id}
                        comment={comment}
                        isNew={project.newCommentId === comment.id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          }
        </div>
        <div className="project-footer">
          <div className="container">
            <div className="raw">
              <div className="col-sm-12">
                <CommentInput
                  dispatch={this.props.dispatch}
                  postId={id}
                />
                <nav>
                  <ul className="pager">
                    { data.prev_project && <li className="previous"><Link to={`/project/${data.prev_project}`}><span aria-hidden="true">&larr;</span> Previous project</Link></li>}
                    { data.next_project &&  <li className="next"><Link to={`/project/${data.next_project}`}>Next project <span aria-hidden="true">&rarr;</span></Link></li>}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * map redux state to project page properties
 * @function mapStateToProps
 * @param {object} state - redux state object
 * @param {object} ownProps - redux properties
 */
function mapStateToProps(state, ownProps) {
  return {
    form: state.form,
    projects: state.projects,
    project: state.project,
    user: state.user,
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(ProjectPage);