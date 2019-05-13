import React from 'react';
import Stats from 'components/Stats';
import ProjectsList from 'components/ProjectsList';
import Subscribe from 'components/Subscribe';
import { connect } from 'react-redux';
import { withHeader } from 'components/HOC/HeaderDecorator';

const ProjectsPage = () => {
    return (
        <div>
            <Stats />
            <ProjectsList />
            <Subscribe />
        </div>
    );
};

export default connect()(withHeader(ProjectsPage));
