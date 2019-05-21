import React, { Component } from 'react';
import { withHeader } from 'components/HOC/HeaderDecorator';
import { connect } from 'react-redux';
import ProjectStatus from './ProjectStatus'
import ProjectProgressBar from './ProjectProgressBar'
import ProjectTitle from './ProjectTitle'
import { getProjectsCategories } from 'actions/projectActions'
import ProjectButtons from './ProjectButtons'
import { alertActions } from 'actions/alertActions'
import { newProjectStep2 } from 'actions/projectActions'

class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false,
            selectedCategory: this.props.selectedCategory
        }

        this.clickHandler = this.clickHandler.bind(this)
        this.categoryClickHandler = this.categoryClickHandler.bind(this)
        this.nextClickHandler = this.nextClickHandler.bind(this)
        this.prevClickHandler = this.prevClickHandler.bind(this)
    }

    componentWillMount() {
        this.props.dispatch(getProjectsCategories())
    }

    nextClickHandler() {
        if (this.state.selectedCategory === '') {
            this.props.dispatch(alertActions.error("Project category is not selected"));
            return;
        }
        this.props.dispatch(newProjectStep2(this.state.selectedCategory));
        this.props.history.push('/step3');
    }

    prevClickHandler() {
    }

    clickHandler() {
        this.setState({
            showDropdown: !this.state.showDropdown
        })
    }

    categoryClickHandler(e) {
        var selectedCategory = '';
        if (e.target.nodeName === 'SPAN') {
            selectedCategory = e.target.innerText
        } else if (e.target.nodeName === 'A') {
            selectedCategory = e.target.text
        }
        this.setState({
            ...this.state,
            selectedCategory
        })
    }

    render() {
        let categories = this.props.categories.map(category => {
            return (
                <a className={
                    this.state.selectedCategory === category.name ?
                       "dropdown-item selected" :
                       "dropdown-item"
                    }
                    key={category.id} href="#" onClick={this.categoryClickHandler}>
                    <span className="search-option">{category.name}</span>
                    <i className="fa fa-check"></i>
                </a>
            )
        })

        return (
            <div className="container-fluid start-project-step2">
                <ProjectStatus />
                <ProjectProgressBar step="2" status="50" />
                <ProjectTitle title="Pick a Project Category" />
                <div className="row project-category justify-content-center">
                    <div className="col col-sm-6">
                        <div className="dropdown" onClick={this.clickHandler}>
                            <button
                                type="button"
                                className="btn btn-default dropdown-toggle category-select"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {this.state.selectedCategory == '' ? 'All Categories' : this.state.selectedCategory}
                                <i className="fas fa-caret-down"></i>
                            </button>
                            <div
                                className={this.state.showDropdown ?
                                    "dropdown-menu show" :
                                    "dropdown-menu"}>
                                {categories}
                            </div>
                        </div>
                    </div>
                </div>
                <ProjectButtons
                    nextClickHandler={this.nextClickHandler}
                    prevClickHandler={this.prevClickHandler}
                />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        categories: state.projects.categories,
        selectedCategory: state.projects.newProject.category || ''
    };
}

export default connect(mapStateToProps)(withHeader(Step2))
