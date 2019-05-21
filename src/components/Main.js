import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import Home from 'pages/Home';
import LoginComponent from 'components/Login/LoginComponent';
import { alertActions } from '../actions/alertActions';
import { withRouter } from "react-router";
import PrivatePage from 'components/Private/PrivatePage';
import withPrivateRoute from 'components/HOC/PrivateRoute';
import ProjectsPage from 'components/Project/ProjectsPage';
import ProjectPage from 'components/Project/ProjectPage';
import Step1 from 'components/StartProject/Step1';
import Step2 from 'components/StartProject/Step2';

class Main extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        this.historyUnlisten = this.props.history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    componentWillUnmount() {
        this.historyUnlisten();
    }

    render() {
        const { alert } = this.props;
        return (
            <main>
                <div className="container text-center">
                { alert && alert.message && 
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                </div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={LoginComponent} />
                    <Route path="/private" exact component={withPrivateRoute(PrivatePage)} />
                    <Route path="/projects" exact component={ProjectsPage} />
                    <Route path="/project/:projectId" component={ProjectPage} />
                    <Route path="/start" exact component={Step1} />
                    <Route path="/step2" exact component={Step2} />
                </Switch>
            </main>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(withRouter(Main));
