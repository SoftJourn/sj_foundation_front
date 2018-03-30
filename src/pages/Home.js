import React from 'react';
import Present from '../components/Present';
import Stats from '../components/Stats';
import ProjectsList from '../components/ProjectsList';
import Subscribe from '../components/Subscribe';

const Home = () => {
    return (
        <div>
            <Present />
            <Stats />
            <ProjectsList />
            <Subscribe />
        </div>
    );
};

export default Home;