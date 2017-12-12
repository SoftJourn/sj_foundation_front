import React from 'react';
import { connect } from 'react-redux';
import Present from '../components/layout/_Present';
import Stats from '../components/layout/_Stats';
import ProjectsList from '../components/project/_ProjectsList';
import Subscribe from '../components/layout/_Subscribe';

// const queryInit = {category: '', type: '', sort: ''};

const MainPage = () => {
    return (
        <div>
            <Present />
            <Stats />
            <ProjectsList />
            <Subscribe />
        </div>
    );
};

export default connect()(MainPage);