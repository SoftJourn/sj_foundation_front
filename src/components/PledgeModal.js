import React, {Component} from 'react';
import { pledgeProject } from '../actions/projectActions';

export default class PledgeModal extends Component {

  constructor(props) {
    super();
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit() {
    this.props.dispatch(pledgeProject(this.props.id, this.state.value));
  }

  render() {
    return (
      <div className="modal fade" id="back-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Modal title</h4>
            </div>
            <div className="modal-body">
              <input type="text" name="amount" onChange={this.handleChange}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.handleSubmit} >Pledge</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}