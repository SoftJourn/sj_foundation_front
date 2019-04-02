import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const withPrivateRoute = Component => (props) => {
    // removing dispatch prop,to avoid passing it down unnecessary
    const { isLoggedIn, dispatch, ...rest } = props;

    return (
        <Route 
            {...rest}
            render={props =>
                isLoggedIn
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
            }
        />
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.authentication.isLoggedIn || false
});

const composedPrivateRoute = compose(
    connect(mapStateToProps, null),
    withPrivateRoute
);

export default composedPrivateRoute;
