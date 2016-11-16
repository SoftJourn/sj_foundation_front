import React, {Component} from 'react';
import {createComment} from '../actions/commentActions';

export default class CommentInput extends Component {

  constructor(props) {
    super();
    this.state = {
      active: false,
      comment: '',
    };
    this.onFocus.bind(this);
  }

  onFocus() {
    this.setState({
      active: true,
    });
  }

  onSubmit() {
    this.props.dispatch(createComment(
      this.props.postId,
      this.state.comment,
    ));

    this.setState({
      active: false,
    });
  }

  onChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  render() {
    const {active} = this.state;
    return (
      <div>
        { !active &&
          <input
            className="project-comment-input"
            type="text"
            placeholder="Comment this"
            size="50"
            onFocus={this.onFocus.bind(this)}
          />
        }
        {
          active &&
          <div className="form-comment">
            <div className="form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea autoFocus onChange={this.onChange.bind(this)} className="form-control" rows="5" id="comment" />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Send</button>
            </div>
          </div>
        }
      </div>
    );
  }
}