import React, { Fragment } from 'react'

function Checkbox(props) {
    return (
        <Fragment>
            <label className="m-checkbox">
                {props.label}
                <input
                    type="checkbox"
                    checked={props.checked}
                    onChange={props.onChange}
                />
                <span className="checkmark"></span>
            </label>
        </Fragment>
    );
}

export default Checkbox
