import React from 'react';

function ProjectButton(props) {
    let prevButton;
    if (props.prevClickHandler) {
        prevButton = (
            <button
                className="btn"
                onClick={props.prevClickHandler}
            >
                <i class="fas fa-arrow-left"></i>
                STEP 1
            </button>
        )
    }
    return (
        <div className="row justify-content-center new-project-buttons">
            <div className="col col-sm-3 text-left">
                {prevButton}
            </div>
            <div className="col col-sm-3 text-right">
                <button
                    className="btn"
                    onClick={props.nextClickHandler}
                >Next</button>
            </div>
        </div>
    )
}

export default ProjectButton
