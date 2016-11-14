import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../actions/userActions';


class TransactionPage extends Component {

  constructor(props) {
    super();
    this.state = {
      user: props.user,
    };
    props.dispatch(getTransactions(props.user.ID));
  }

  /**
   * new props from redux state
   * @function componentWillReceiveProps
   * @param {object} nextProps - new props for component
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
    });
  }

  getStatusClassName(status) {
    switch (status) {
      case 'active':
        return '';
      case 'founded':
        return 'success';
      case 'not_founded':
        return 'danger';
    }
  }

  render() {
    const {transactions} = this.state.user;
    return (
      <div className="container">
        <div className="transactions">
          <h2>Transactions</h2>
          <table className="table table-bordered table table-striped">
            <thead>
              <tr>
                <td>Project</td>
                <td>Amount</td>
                <td>Status</td>
              </tr>
            </thead>
            {Object.keys(transactions).map(key => {
              return (
                <tbody>
                  <tr className={this.getStatusClassName(transactions[key].status)}>
                    <td>{transactions[key].project.name}</td>
                    <td>{transactions[key].amount}</td>
                    <td>{transactions[key].status}</td>
                  </tr>
                </tbody>
              );
            })}

          </table>
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
    user: state.user,
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(TransactionPage);