import React from 'react';

function ProjectStatus() {
    return (
        <div className="row justify-content-start project-status pt-2">
            <div className="col col-sm-1 offset-sm-1 pr-0">
                <i className="fa fa-eye pr-2"></i>
                Visibility: Public
            </div>
            <div className="col col-sm-2 pl-0">
                <i className="fa fa-file-alt pr-2"></i>
                Status: Draft
            </div>
        </div>
    )
}

export default ProjectStatus
