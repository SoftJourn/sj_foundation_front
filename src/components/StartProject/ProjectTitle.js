import React from 'react';

function ProjectTitle(props) {
    return (
        <div className="row new-project-title">
            <div className="col text-center">
                {props.title}
            </div>
        </div>
    )
}

export default ProjectTitle
