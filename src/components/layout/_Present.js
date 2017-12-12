import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Menu from './_Menu';

export default class Present extends Component {

    constructor(props) {
        super(props);
    }

    // TODO: temporary hack for menu demo; need to rewrite it correct!
    componentDidMount() {
        const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        let navbar = document.querySelector('nav.header');
        if (window.scrollY > viewportHeight - 100) {
            navbar.classList.add('visible-header');
        } else {
            navbar.classList.remove('visible-header');
        }
    }

    render() {
        return (
            <div className="container-fluid present-block">
                <div className="row">
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
                            <div className="col text-heading text-heading-thin">
                                Create more <br/>interesting projects <br/>
                                <span className="text-heading-accent"> together</span>
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