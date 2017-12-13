import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateProject from '../components/create/CreateProject'

function mapStateToProps(state, ownProps) {
  return {
    form: state.form,
  };
}

const StartProjectPage = connect(mapStateToProps)(CreateProject);

export default StartProjectPage;