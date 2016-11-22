import React, { Component } from 'react';
import {setCoinsToAll} from '../actions/adminActions';
import { connect } from 'react-redux';

class AdminPage extends Component {

  constructor() {
    super();
    this.state = {
      value: '',
      status: '',
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  sendCoinsToAll() {
    const value = this.state.value;
    this.setState({
      value: '',
      status: `Success! Every account get ${value} coins`,
    });
    this.props.dispatch(setCoinsToAll(this.state.value))
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="form-signin">
            {this.state.status &&
              <div className="raw alert alert-success">
                {this.state.status}
              </div>
            }
            <h2 className="form-signin-heading">Send coins to all</h2>
            <label htmlFor="inputAmount" className="sr-only">Amount for one account:</label>
            <input value={this.state.value} onChange={this.handleChange.bind(this)} type="text" id="inputAmount" className="form-control" placeholder="amount" required="" autoFocus={true} />
            <button onClick={this.sendCoinsToAll.bind(this)} className="btn btn-lg btn-primary btn-block" type="submit">Send</button>
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
  return {};
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(AdminPage);