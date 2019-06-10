import React, { Component } from 'react';
import Subscribe from 'components/Subscribe';
import StatsWidget from './StatsWidget';

function Project(props) {
    return (
        <div className="project-page">
            <div className="container-fluid project-heading-wrap">
                <div className="container project-heading">
                    <div className="row project-sub-menu align-items-center">
                        <div className="col-auto page-nav">Campaign</div>
                        <div className="col-auto page-nav">Documents</div>
                        <div className="col-auto page-nav">Comments</div>
                        <div className="col-auto page-nav">Team</div>
                        <div className="col-auto page-nav">FAQ</div>
                        <div className="col text-right">
                            <button className="btn btn-default btn-rounded">Donate</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-heading text-center">{props.title}</div>
                    </div>
                    <div className="row justify-content-center project-image-wrap">
                        <div className="col-auto project-image">
                            <img src={props.thumbUrl} alt="Project image"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container project-main-info">
                <div className="main-info-text">
                    <div className="row text-center">
                        <div className="col">
                            <h2 className="heading">Main Info</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div>
                                {props.content}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col stat-widget-wrap">
                        <StatsWidget
                            supporters={props.supporters}
                        />
                    </div>
                </div>
            </div>

            <div className="container-fluid project-about-info">
                <div className="about-info-text">
                    <div className="row text-center">
                        <div className="col">
                            <h2 className="heading">About the project</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div>
                                {props.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container project-team-info">
            </div>


            <Subscribe />

        </div>
    )
}

export default Project
