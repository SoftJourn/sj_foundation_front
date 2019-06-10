import React, { Component } from 'react'
import { withHeader } from 'components/HOC/HeaderDecorator';
import { connect } from 'react-redux';
import ProjectStatus from './ProjectStatus'
import ProjectProgressBar from './ProjectProgressBar'
import ProjectTitle from './ProjectTitle'
import ProjectButtons from './ProjectButtons'
import { alertActions } from 'actions/alertActions'
import { createProject } from 'actions/projectActions'
import Checkbox from './Checkbox'
import dateFnsFormat from 'date-fns/format'
import isFuture from 'date-fns/is_future'
import setHours from 'date-fns/set_hours'
import setMinutes from 'date-fns/set_minutes'
import DueDatePicker from './DueDatePicker'

class Step4 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            price: this.props.price,
            priceInvalid: false,
            canDonate: this.props.canDonate,
            dueDate: new Date(),
            dueHour: new Date()
        }
        this.handleDonateChange = this.handleDonateChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.nextClickHandler = this.nextClickHandler.bind(this)
        this.prevClickHandler = this.prevClickHandler.bind(this)
        this.handleDueDateChange = this.handleDueDateChange.bind(this)
        this.handleDueHourChange = this.handleDueHourChange.bind(this)
    }

    handlePriceChange(event) {
        let price =
            event.target.validity.valid ?
                event.target.value :
                this.state.price
        const lastSymbol = price.substr(price.length - 1)
        if (lastSymbol.toUpperCase() != lastSymbol.toLowerCase()) {
            price = price.substr(0, price.length - 1)
        }
        this.setState({
            ...this.state,
            price
        })
    }

    handleDonateChange(event) {
        this.setState({
            ...this.state,
            canDonate: !this.state.canDonate
        })
    }

    nextClickHandler() {
        this.props.dispatch(alertActions.clear())
        if (this.state.price === '') {
            this.setState({
                ...this.state,
                priceInvalid: true
            })
            this.props.dispatch(alertActions.error("Price is not specified"))
            return
        } else {
            this.setState({
                ...this.state,
                priceInvalid: false
            })
        }
        var due = this.buildDueDate();
        if (!isFuture(due)) {
            this.props.dispatch(alertActions.error("Due Date is expired"))
            return
        }

        this.props.dispatch(createProject(
            this.props.title,
            this.state.price,
            this.state.canDonate,
            due,
            this.props.category,
            this.props.description,
            this.props.imageUrl
        ))
        this.props.history.push('/')
    }

    buildDueDate() {
        var dueDate = this.state.dueDate;
        var dueHour = this.state.dueHour;
        var formattedDueDate = dateFnsFormat(dueDate);
        var hours = dueHour.getHours();
        var minutes = dueHour.getMinutes();
        formattedDueDate = setHours(formattedDueDate, hours);
        formattedDueDate = setMinutes(formattedDueDate, minutes);

        return formattedDueDate.getTime();
    }

    prevClickHandler() {
        this.props.history.push('start');
    }

    handleDueDateChange(date) {
        this.setState({
            dueDate: date
        })
    }

    handleDueHourChange(hour) {
        this.setState({
            dueHour: hour
        })
    }

    render() {
        return (
            <div className="container-fluid start-project-step4">
                <ProjectStatus greenButtons={true} />
                <ProjectProgressBar step="4" status="100" />
                <ProjectTitle title="Project Meta" />
                <div className="row project-price-label justify-content-center">
                    <div className="col col-sm-3">
                        Price
                    </div>
                </div>
                <div className="row project-price justify-content-center">
                    <div className="col col-sm-3">
                        <input
                            type="text"
                            className={ this.state.priceInvalid ?
                                    "price-input invalid" :
                                    "price-input" }
                            value={this.state.price}
                            pattern="^\d+.?(\d{1,2})?$"
                            onChange={this.handlePriceChange}
                        />
                    </div>
                </div>
                <div className="row donate-more justify-content-center">
                    <div className="col col-sm-3 d-flex">
                        <Checkbox
                            label="can donate more"
                            checked={this.state.canDonate}
                            onChange={this.handleDonateChange}
                        />
                    </div>
                </div>
                <DueDatePicker
                    dueDate={this.state.dueDate}
                    onDueDateChange={this.handleDueDateChange}
                    dueHour={this.state.dueHour}
                    onDueHourChange={this.handleDueHourChange}
                />
                <ProjectButtons
                    nextClickHandler={this.nextClickHandler}
                    nextValue="submit project"
                    nextStyle="blue-button"
                    prevClickHandler={this.prevClickHandler}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    price: state.projects.newProject.price || '',
    canDonate: state.projects.newProject.canDonate || false,
    title: state.projects.newProject.title || '',
    category: state.projects.newProject.category || '',
    description: state.projects.newProject.description || '',
    imageUrl: state.projects.newProject.projectImageUrl || ''
})

export default connect(mapStateToProps)(withHeader(Step4))
