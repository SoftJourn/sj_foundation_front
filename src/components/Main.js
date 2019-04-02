import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import Home from 'pages/Home';
import LoginForm from 'components/Login/LoginForm';
import { alertActions } from '../actions/alertActions';
import { withRouter } from "react-router";
import PrivatePage from 'components/Private/PrivatePage';
import withPrivateRoute from 'components/HOC/PrivateRoute';

class Main extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        this.props.history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
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
                    <Route path="/login" exact component={LoginForm} />
                    <Route path="/private" exact component={withPrivateRoute(PrivatePage)} />
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
