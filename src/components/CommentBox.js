import React, {Component} from 'react';
import {createComment} from '../actions/commentActions';
import moment from 'moment';
import classNames from 'classnames';

export default class CommentBox extends Component {

  constructor(props) {
    super();
    this.state = {
      comment: props.comment,
      isNew: props.isNew,
    };
  }

  getCommentDate() {
    return moment(this.state.comment.date).format('MMMM Do');
  }

  onFocus() {
    this.setState({
      active: true,
    });
  }

  onSubmit() {
    this.props.dispatch(createComment());
  }

  onChange(event) {
    this.setState({
      commentMsg: event.target.value
    });
  }

  render() {
    const { comment, isNew } = this.state;
    const commentClass = classNames('comment-box', {'new-comment': isNew});
    if (isNew) {
      document.getElementById("project-nav").scrollIntoView();
    }
    return (
      <div className={commentClass}>
        <div className="comment-author-name">
          {comment.author_name}:
        </div>
        <div dangerouslySetInnerHTML={{__html: comment.content.rendered}}/>
        <div className="comment-date">{this.getCommentDate()}</div>
      </div>
    );
  }
}