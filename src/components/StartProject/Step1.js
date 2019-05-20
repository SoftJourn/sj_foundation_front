import React, { Component } from 'react';
import { withHeader } from 'components/HOC/HeaderDecorator';
import { connect } from 'react-redux';
import { newProjectStep1 } from 'actions/projectActions'
import { alertActions } from 'actions/alertActions'

class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: this.props.title
        }

        this.handleChange = this.handleChange.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidUpdate(prevProps) {
    }

    handleChange(event) {
        this.setState({
            projectName: event.target.value
        })
    }

    clickHandler(event) {
        if (this.state.projectName === '') {
            this.props.dispatch(alertActions.error("Project name is empty"));
            return;
        }
        this.props.dispatch(newProjectStep1(this.state.projectName));
        this.props.history.push('/step2');
    }

    render() {
        var progressStyle = {
            width: '25%'
        }

        return (
            <div className="container-fluid start-project-step1">
                <div className="row justify-content-start project-status pt-2">
                    <div className="col col-sm-2 offset-sm-1 pr-0">
                        <i className="fa fa-eye pr-2"></i>
                        Visibility: Public
                    </div>
                    <div className="col col-sm-2 pl-0">
                        <i className="fa fa-file-alt pr-2"></i>
                        Status: Draft
                    </div>
                </div>
                <div className="row project-progress justify-content-around my-2">
                    <div className="col text-center">
                        <div>
                            1 Step <span className="general-steps">of 4</span>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="col col-sm-6">
                        <div className="progress progress-wrapper">
                          <div className="progress-bar progress-bar-done" role="progressbar" style={progressStyle} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
                <div className="row new-project-title">
                    <div className="col text-center">
                        add new project
                    </div>
                </div>
                <div className="row new-project-name justify-content-around">
                    <div className="col col-sm-5 text-center">
                        <input
                            className="project-name py-0"
                            type="text"
                            placeholder="Enter Title Name"
                            value={this.state.projectName}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row justify-content-around new-project-next">
                    <div className="col col-sm-5 text-right">
                        <button
                            className="btn"
                            onClick={this.clickHandler}
                        >Next</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    title: state.projects.newProject.title || ''
});

export default connect(mapStateToProps)(withHeader(Step1))
