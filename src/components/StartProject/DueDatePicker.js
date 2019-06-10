import React, { Fragment } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function handleChangeRaw(e) {
    e.preventDefault();
}

function DueDatePicker(props) {
    return (
        <Fragment>
        <div className="row due-date-label justify-content-center">
            <div className="col col-sm-3">
                Due Date
            </div>
        </div>
        <div className="row due-date justify-content-center">
            <div className="col col-sm-3 d-flex justify-content-between">
                <DatePicker
                    className="due-date-picker"
                    selected={props.dueDate}
                    dateFormat="MM/dd/yy"
                    onChange={props.onDueDateChange}
                    onChangeRaw={handleChangeRaw}
                />
                <DatePicker
                    selected={props.dueHour}
                    onChange={props.onDueHourChange}
                    onChangeRaw={handleChangeRaw}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="hh:mm aa"
                    timeCaption="Time"
                    className="due-time-picker"
                />
            </div>
        </div>
        </Fragment>
    )
}

export default DueDatePicker
