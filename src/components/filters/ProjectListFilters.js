import React, {PropTypes} from 'react';
import MediaQuery from 'react-responsive';
import CategoriesFilter from './CategoriesFilter';
import TextFilterDropdown from './TextFilterDropdown';

class ProjectListFilters extends React.Component {

  render() {
    const {selectedCategory, categories} = this.props;
    const projectFilterOptions = [
      {label: 'any project'},
      {label: 'active projects'},
      {label: 'won projects'},
      {label: 'last projects'},
    ];
    const projectSortOptions = [
      {label: 'magic'},
      {label: 'time remain'},
      {label: 'date created'},
    ];
    return (
      <div>
        <div className="project-results-header">
          <div className="container">
            <div className="raw">
              <div className="col-xs-12 col-sm-8">
                <CategoriesFilter selectedCategory={selectedCategory} categories={categories} dispatch={this.props.dispatch} />
              </div>
              <MediaQuery query='(min-width: 769px)' className="col-sm-4 project-filters">
                {/*<TextFilterDropdown options={projectFilterOptions} />*/}
              </MediaQuery>
            </div>
          </div>
        </div>
        <MediaQuery query='(max-width: 768px)' className="col-sm-4">
          <div className="container">
            <div className="raw">
              <div className="col-sm-12">
              </div>
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }

}

ProjectListFilters.propTypes = {};

ProjectListFilters.defaultProps = {};

export default ProjectListFilters;