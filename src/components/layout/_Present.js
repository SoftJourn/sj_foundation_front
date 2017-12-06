import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Menu from './_Menu';

export default class Present extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row present-block">
                    <div className="col-6 present-video">

                    </div>
                    <div className="col-6 present-form d-flex flex-column justify-content-between">
                        <div className="row align-items-center">
                            <div className="col">
                                <Menu className="row menu justify-content-start"
                                      itemClassName="col-auto"/>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col text-heading">
                                Create more interesting
                                projects together
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col">
                                Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nulla quam velit,
                                vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo.
                                <br/><br/>
                                Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                                Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col">
                                <NavLink className='btn btn-rounded' to="/start" exact>Start project</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
