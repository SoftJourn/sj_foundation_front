import React, { Component } from 'react';
import { withHeader } from 'components/HOC/HeaderDecorator';
import { connect } from 'react-redux';
import { newProjectStep1 } from 'actions/projectActions'
import { alertActions } from 'actions/alertActions'
import ProjectStatus from './ProjectStatus'
import ProjectProgressBar from './ProjectProgressBar'
import ProjectTitle from './ProjectTitle'
import ProjectButtons from './ProjectButtons'

class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: this.props.title
        }

        this.handleChange = this.handleChange.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
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
        return (
            <div className="container-fluid start-project-step1">
                <ProjectStatus />
                <ProjectProgressBar step="1" status="25" />
                <ProjectTitle title="Add New Project" />
                <div className="row new-project-name justify-content-around">
                    <div className="col col-sm-4 text-center">
                        <input
                            className="project-name py-0"
                            type="text"
                            placeholder="Enter Title Name"
                            value={this.state.projectName}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <ProjectButtons
                    nextClickHandler={this.clickHandler} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    title: state.projects.newProject.title || ''
});

export default connect(mapStateToProps)(withHeader(Step1))
