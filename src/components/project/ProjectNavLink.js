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

  render() {
    const {tab, name, count, mainUrl} = this.state;
    if (!count) {
      return null;
    }
    return (
      <li role="presentation" className={tab == name && "active"}>
        <Link to={`${mainUrl}${name}`}>
          {name.toUpperCase()} <span className="badge">{count}</span>
        </Link>
      </li>
    )
  }
}