import React, {Component} from 'react';
import { Link } from 'react-router'

export default class ProjectNavLink extends Component {

  constructor(props) {
    super();
    this.state = {
      tab: props.tab,
      name: props.name,
      mainUrl: props.mainUrl,
      count: props.count,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      tab: props.tab,
      name: props.name,
      mainUrl: props.mainUrl,
      count: props.count,
    });
  }

  render() {
    const {tab, name, count, mainUrl} = this.state;
    if (!count) {
      return null;
    }
    return (
      <Link to={`${mainUrl}${name}`} className={tab == name && "active"}>
        {name.toUpperCase()} <span className="badge">{count}</span>
      </Link>
    )
  }
}