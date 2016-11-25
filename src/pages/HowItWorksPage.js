import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getHowItWorksPage} from '../actions/pagesActions';

class HowItWorksPage extends Component {
  constructor(props) {
    super();
    this.state = {
      pages: props.pages,
    };
    props.dispatch(getHowItWorksPage());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pages: nextProps.pages,
    });
  }

  render() {
    if (this.state.pages.howItWorks.length == 0) {
      return null;
    }
    const {content, title} = this.state.pages.howItWorks;
    return (
      <div className="static-page">
        <div className="container">
          <h1><div dangerouslySetInnerHTML={{__html: title.rendered}} /></h1>
          <div dangerouslySetInnerHTML={{__html: content.rendered}} />
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
    pages: state.pages,
  };
}

/**
 * get the data from redux and feed it into component via props
 */
export default connect(mapStateToProps)(HowItWorksPage);