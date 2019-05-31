import React, { Fragment } from 'react';

function ProjectStatus(props) {
    let greenButtons;
    if (props.greenButtons) {
        greenButtons = (
            <Fragment>
                <div className="col col-sm-1 offset-sm-5 p-0">
                    <button className="green-button">safe draft</button>

                    <button className="green-button">preview</button>

                    <button className="green-button submit">submit for review</button>
                </div>
            </Fragment>
        )
    }
    return (
        <div className="row justify-content-start project-status pt-2">
            <div className="col col-sm-1 offset-sm-1 pr-0">
                <i className="fa fa-eye pr-2"></i>
                Visibility: Public
            </div>
            <div className="col col-sm-1 pl-0">
                <i className="fa fa-file-alt pr-2"></i>
                Status: Draft
            </div>
            {greenButtons}
        </div>
    )
}

export default ProjectStatus
