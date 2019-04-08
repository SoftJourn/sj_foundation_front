import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withHeader } from 'components/HOC/HeaderDecorator';
import { userActions } from 'actions/userActions';
import PrivatePage from 'components/Private/PrivatePage';
import LoginForm from './LoginForm';

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            submitPressed: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ submitPressed: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLoggedIn) {
            this.props.history.push('/private');
        }
    }

    render() {
        const { username, password, submitPressed } = this.state;

        if (this.props.isLoggedIn) {
            return (
                <PrivatePage />
            )
        } else {
            return (
                <LoginForm
                    state={this.state}
                    onSubmit={this.onSubmit}
                    handleChange={this.handleChange}
                />
            )
        }
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authentication.isLoggedIn || false
});

export default connect(mapStateToProps)(withHeader(LoginComponent))
