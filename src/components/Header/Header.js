import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Menu from './Menu';
import { connect } from 'react-redux';
import { headerActions } from 'actions/headerActions';
import _ from 'lodash';

const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.throttledScroll = _.throttle(this.handleScroll, 500);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.throttledScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.throttledScroll);
    }

    handleScroll(event) {
        if (document.location.pathname === '/') {
            let visibleHeader = (window.scrollY > viewportHeight - 100);
            if (this.props.visibleHeader != visibleHeader) {
                this.props.dispatch(headerActions.toggle(visibleHeader));
            }
        }
    }

    render() {
        let visibleHeaderClass = this.props.visibleHeader && 'visible-header';
        return (
            <nav className={"container-fluid header fixed-top " + visibleHeaderClass}>
                <div className="container">
                    <div className="row align-items-center header-inner">
                        <div className="col-2 sj-logo">
                            sj
                        </div>
                        <div className="col">
                            <Menu className="row menu justify-content-center"
                                  itemClassName="col-auto"/>
                        </div>
                        <div className="col-2 controls">
                            <div className="row">
                                <div className="col">
                                    <NavLink className="btn btn-prime" to="/start">Start project</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        visibleHeader: state.header.visibleHeader
    };
}

export default connect(mapStateToProps)(Header)
