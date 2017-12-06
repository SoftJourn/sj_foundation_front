import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TabMain from './TabMain';
import TabDetails from './TabDetails';
import TabTeam from './TabTeam';
import '../../../node_modules/react-select/dist/react-select.css';
import '../../../node_modules/pretty-checkbox/src/pretty-checkbox.scss';

export class CreateProject extends React.Component {

    render() {
        return (
            <Tabs>
                <div className="create-project-page">
                    <div className="container-fluid block-heading">
                        <div className="row justify-content-center">
                            <div className="col">
                                <div className="text-heading text-center">Create Project</div>
                                <div className="create-project-controls text-center">
                                    <button className="btn btn-outline">Visibility</button>
                                    <button className="btn btn-outline">Preview</button>
                                    <button className="btn btn-outline">Save Draft</button>
                                    <button className="btn btn-rounded">Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <TabList className="row justify-content-center form-tabs">
                                <Tab className="form-tab col text-center rounded-top">Main</Tab>
                                <Tab className="form-tab col text-center rounded-top">Details</Tab>
                                <Tab disabled
                                     className="form-tab col text-center rounded-top"
                                     disabledClassName="form-tab-disabled">Team</Tab>
                            </TabList>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <TabPanel selectedClassName="tab-panel">
                                <TabMain />
                            </TabPanel>
                            <TabPanel selectedClassName="tab-panel">
                                <TabDetails />
                            </TabPanel>
                            <TabPanel selectedClassName="tab-panel">
                                <TabTeam />
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </Tabs>
        );
    }

}

export default CreateProject;