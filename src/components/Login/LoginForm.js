import React, { Component } from 'react'

class LoginForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <div className="text-center p-5">
                  <h1 className="form-signin-heading">Sign in to SJ Foundation</h1>
                  <div className="h6">Enter your details below.</div>
                </div>
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <form onSubmit={this.props.onSubmit}>
                        <div className="form-label-group mb-4">
                            <label htmlFor="inputUsername">LDAP Username</label>
                            <input
                              value={this.props.formData.username}
                              name="username"
                              type="text"
                              autoComplete="off"
                              id="inputUsername"
                              placeholder="Enter you LDAP login"
                              className={"form-control border " + (this.props.formData.submitPressed && !this.props.formData.username ? 'is-invalid' : '')}
                              autoFocus={true}
                              onChange={this.props.handleChange}
                            />
                            {
                                this.props.formData.submitPressed && !this.props.formData.username &&
                                <div className="invalid-feedback">Username is required</div>
                            }
                        </div>
                        <div className="form-label-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input
                              value={this.props.formData.password}
                              name="password"
                              type="password"
                              id="inputPassword"
                              placeholder="Enter your password"
                              className={"form-control border " + (this.props.formData.submitPressed && !this.props.formData.password ? 'is-invalid' : '')}
                              onChange={this.props.handleChange}
                            />
                            {
                                this.props.formData.submitPressed && !this.props.formData.password &&
                                <div className="invalid-feedback">Password is required</div>
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

export default LoginForm
