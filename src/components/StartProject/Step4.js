import React, { Component } from 'react'
import { withHeader } from 'components/HOC/HeaderDecorator';
import { connect } from 'react-redux';
import ProjectStatus from './ProjectStatus'
import ProjectProgressBar from './ProjectProgressBar'
import ProjectTitle from './ProjectTitle'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { DateUtils } from 'react-day-picker'
import ProjectButtons from './ProjectButtons'
import { alertActions } from 'actions/alertActions'
import { createProject } from 'actions/projectActions'

import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import isFuture from 'date-fns/is_future'
import getMilliseconds from 'date-fns/get_milliseconds'
import setHours from 'date-fns/set_hours'
import setMinutes from 'date-fns/set_minutes'

class Step4 extends Component {
    constructor(props) {
        super(props)
        this.FORMAT = 'MM/DD/YY'
        this.state = {
            price: this.props.price,
            priceInvalid: false,
            canDonate: this.props.canDonate,
            selectedDay: this.props.selectedDay,
            hour: this.props.hour,
            hourInvalid: false
        }
        this.handleDonateChange = this.handleDonateChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleHourChange = this.handleHourChange.bind(this)
        this.nextClickHandler = this.nextClickHandler.bind(this)
        this.prevClickHandler = this.prevClickHandler.bind(this)
        this.handleDayChange = this.handleDayChange.bind(this)
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

    handleHourChange(event) {
        let hour
        var regexLengthOne = RegExp('^[012]$')
        var regexLengthTwo = RegExp('([01]?[0-9]|2[0-3])$')
        var regexLengthThree = RegExp('([01]?[0-9]|2[0-3]):$')
        var regexLengthFour = RegExp('([01]?[0-9]|2[0-3]):[0-5]$')
        var regexLengthFive = RegExp('([01]?[0-9]|2[0-3]):[0-5][0-9]$')
        switch (event.target.value.length) {
            case 1:
                if (regexLengthOne.test(event.target.value)) {
                    hour = event.target.value
                } else {
                    hour = this.state.hour
                }
                break;
            case 2:
                if (regexLengthTwo.test(event.target.value)) {
                    hour = event.target.value
                } else {
                    hour = this.state.hour
                }
                break;
            case 3:
                if (regexLengthThree.test(event.target.value)) {
                    hour = event.target.value
                } else {
                    hour = this.state.hour
                }
                break;
            case 4:
                if (regexLengthFour.test(event.target.value)) {
                    hour = event.target.value
                } else {
                    hour = this.state.hour
                }
                break;
            case 5:
                if (regexLengthFive.test(event.target.value)) {
                    hour = event.target.value
                } else {
                    hour = this.state.hour
                }
                break;
            default:
                hour = this.state.hour
                break;
        }
        this.setState({
            ...this.state,
            hour
        })
    }

    handleDonateChange(event) {
        this.setState({
            ...this.state,
            canDonate: !this.state.canDonate
        })
    }

    parseDate(str, format, locale) {
        const parsed = dateFnsParse(str, format, { locale });
        if (DateUtils.isDate(parsed)) {
            return parsed;
        } else {
            return undefined;
        }
    }

    formatDate(date, format, locale) {
        return dateFnsFormat(date, format, { locale });
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
        if (!isFuture(this.state.selectedDay)) {
            this.props.dispatch(alertActions.error("Due Date is expired"))
            return
        }
        var regexHour = RegExp('([01]?[0-9]|2[0-3]):[0-5][0-9]$')
        if (this.state.hour === '') {
            this.props.dispatch(alertActions.error("Hour is not specified"))
            this.setState({
                ...this.state,
                hourInvalid: true
            })
            return
        } else if (!regexHour.test(this.state.hour)) {
            this.props.dispatch(alertActions.error("Hour is invalid"))
            this.setState({
                ...this.state,
                hourInvalid: true
            })
            return
        } else {
            this.setState({
                ...this.state,
                hourInvalid: false
            })
        }

        var due = this.buildDueDate();

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
        var day = this.state.selectedDay;
        var hourRegex = /^(\d\d):(\d\d)$/;
        var hour = this.state.hour;
        var match = hourRegex.exec(hour);
        var hour = match[1];
        var minutes = match[2];
        var dueDate = this.formatDate(day);
        dueDate = setHours(dueDate, hour);
        dueDate = setMinutes(dueDate, minutes);

        return dueDate.getTime();
    }

    prevClickHandler() {
        this.props.history.push('start');
    }

    handleDayChange(day) {
        this.setState({
            selectedDay: day
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
                        <input
                            type="checkbox"
                            className="donate-more-input"
                            checked={this.state.canDonate}
                            onChange={this.handleDonateChange}
                        />
                        <div className="donate-label">can donate more</div>
                    </div>
                </div>
                <div className="row due-date-label justify-content-center">
                    <div className="col col-sm-3">
                        Due Date
                    </div>
                </div>
                <div className="row due-date justify-content-center">
                    <div className="col col-sm-3">
                        <DayPickerInput
                            formatDate={this.formatDate}
                            format={this.FORMAT}
                            parseDate={this.parseDate}
                            value={this.state.selectedDay}
                            placeholder={this.formatDate(new Date(), this.FORMAT)}
                            onDayChange={this.handleDayChange}
                        />
                        <input
                            type="text"
                            className={ this.state.hourInvalid ?
                                "hour-input invalid" :
                                    "hour-input" }
                            value={this.state.hour}
                            pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
                            onChange={this.handleHourChange}
                            placeholder="12:00"
                        />
                    </div>
                </div>
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
    hour: state.projects.newProject.hour || '',
    selectedDay: state.projects.newProject.selectedDay || new Date(),
    title: state.projects.newProject.title || '',
    category: state.projects.newProject.category || '',
    description: state.projects.newProject.description || '',
    imageUrl: state.projects.newProject.projectImageUrl || ''
})

export default connect(mapStateToProps)(withHeader(Step4))
