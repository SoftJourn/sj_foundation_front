import React from 'react';

function ProjectButton(props) {
    let prevButton;
    if (props.prevClickHandler) {
        prevButton = (
            <button
                className="btn"
                onClick={props.prevClickHandler}
            >
                <i className="fas fa-arrow-left"></i>
                STEP 1
            </button>
        )
    }
    return (
        <div className="row justify-content-center new-project-buttons">
            <div className="col col-sm-2 button-left">
                {prevButton}
            </div>
            <div className="col col-sm-2 button-right">
                <button
                    className="btn"
                    onClick={props.nextClickHandler}
                >Next</button>
            </div>
        </div>
    )
}

export default ProjectButton
