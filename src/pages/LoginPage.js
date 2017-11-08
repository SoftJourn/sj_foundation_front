import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from "../components/LoginForm";

class LoginPage extends Component {


  render() {

    return (
      <div className="row">
        <div className="col" style={{height: "70vh"}}></div>
        <div className="col align-self-center">
          <LoginForm dispatch={this.props.dispatch} />
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    form: state.form,
  };
}

export default connect(mapStateToProps)(LoginPage);