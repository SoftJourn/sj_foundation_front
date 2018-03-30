import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import '../styles/styles.scss';

/**
 * main component - wrapper for all pages
 */
class App extends Component {
    /**
     * render layout
     * @returns {XML}
     */
    render() {
        const { children } = this.props;
        return (
            <div>
                <Header/>
                <div className="main-content">
                    {children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect()(App);
