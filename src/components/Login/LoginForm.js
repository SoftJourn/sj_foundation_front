import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withHeader } from 'components/HOC/HeaderDecorator';
import { userActions } from 'actions/userActions';
import PrivatePage from 'components/Private/PrivatePage';

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            submitted: false
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
        this.setState({ submitted: true });
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
        const { username, password, submitted } = this.state;

        if (this.props.isLoggedIn) {
            return (
                <PrivatePage />
            )
        } else {
            return (
                <div className="container">
                    <div className="text-center p-5">
                      <h1 className="form-signin-heading">Sign in to SJ Foundation</h1>
                      <div className="h6">Enter your details below.</div>
                    </div>
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-label-group mb-4">
                                <label htmlFor="inputUsername">LDAP Username</label>
                                <input
                                  value={username}
                                  name="username"
                                  type="text"
                                  autoComplete="off"
                                  id="inputUsername"
                                  placeholder="Enter you LDAP login"
                                  className={"form-control border border-primary " + (submitted && !username ? 'is-invalid' : '')}
                                  autoFocus={true}
                                  onChange={this.handleChange}
                                />
                                {
                                    submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                }
                            </div>
                            <div className="form-label-group">
                                <label htmlFor="inputPassword">Password</label>
                                <input
                                  value={password}
                                  name="password"
                                  type="password"
                                  id="inputPassword"
                                  placeholder="Enter your password"
                                  className={"form-control border border-primary " + (submitted && !password ? 'is-invalid' : '')}
                                  onChange={this.handleChange}
                                />
                                {
                                    submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                            <div className="form-group text-center m-4">
                                <button className="btn btn-primary">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authentication.isLoggedIn || false
});

export default connect(mapStateToProps)(withHeader(LoginForm))
