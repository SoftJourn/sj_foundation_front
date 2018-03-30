import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class TabButton extends React.Component {

  constructor(props) {
    super();
    this.state = {
      activeTab: props.activeTab,
      count: props.count,
      show: props.show,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      activeTab: props.activeTab,
      count: props.count,
      show: props.show,
    });
  }

  render() {
    const {activeTab, show, count} = this.state;
    const {name, label, mainUrl} = this.props;
    if (!count && !show) {
      return null;
    }
    return (
      <NavLink to={`${mainUrl}${name}`} className={activeTab == name && "active"}>
        {label} <span className="badge">{count != 0 && count}</span>
      </NavLink>
    )
  }

}

TabButton.propTypes = {
  name: React.PropTypes.string.isRequired,
  mainUrl: React.PropTypes.string,
  count: React.PropTypes.number,
  show: React.PropTypes.bool,
  label: React.PropTypes.string,
  activeTab: React.PropTypes.string,
};

TabButton.defaultProps = {
  activeTab: '',
  label: '',
  show: false,
  mainUrl: '/',
  count: 0,
};

export default TabButton;