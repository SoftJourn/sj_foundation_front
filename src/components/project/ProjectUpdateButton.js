import React, {Component} from 'react';
import { Link } from 'react-router';


class ProjectUpdateButton extends Component {

    constructor(props) {
        super();
        this.state = {
          tab: props.tab,
          mainUrl: props.mainUrl,
          user: props.user,
          author: props.author,
          name: props.name
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
          tab: props.tab,
          mainUrl: props.mainUrl,
          user: props.user,
          author: props.author,
          name: props.name
        })
    }


    render() {
        const {tab, name, mainUrl, user, author} = this.state;
        const isUserAdmin = user.isAdmin;
        const isUserAuthor = (author === user.data.data.display_name);
        const isUserAllowedToUpdate = isUserAdmin || isUserAuthor;

        if (!isUserAllowedToUpdate) {
            return null;
        }
        return (
            <li role="presentation" className={tab == name && "active"}>
                <Link to={`${mainUrl}${name}`}>
                    ADD UPDATE
                </Link>
            </li>
        )
    }
}

module.exports = ProjectUpdateButton;