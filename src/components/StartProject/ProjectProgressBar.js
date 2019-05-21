import React, { Fragment } from 'react';

function ProjectProgressBar(props) {
    var progressStyle = {
        width: `${props.status}%`
    }

    return (
        <Fragment>
            <div className="row project-progress justify-content-around my-3">
                <div className="col text-center">
                    <div>
                        {props.step} Step <span className="general-steps">of 4</span>
                    </div>
                </div>
            </div>
            <div className="row justify-content-around">
                <div className="col col-sm-6">
                    <div className="progress progress-wrapper">
                      <div className="progress-bar progress-bar-done" role="progressbar" style={progressStyle} aria-valuenow={props.status} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProjectProgressBar
