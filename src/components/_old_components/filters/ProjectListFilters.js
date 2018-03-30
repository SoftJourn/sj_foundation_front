import React, {PropTypes} from 'react';
import MediaQuery from 'react-responsive';
import CategoriesFilter from './CategoriesFilter';
import TextFilterDropdown from './TextFilterDropdown';

class ProjectListFilters extends React.Component {

  render() {
    const {selectedCategory, categories, query} = this.props;
    const projectFilterOptions = [
      {label: 'any project', value: ''},
      {label: 'active projects', value: 'active'},
      {label: 'won projects', value: 'won'},
      {label: 'lost projects', value: 'lost'},
    ];

    const projectSortOptions = [
      {label: 'magic', value: 'magic'},
      {label: 'time remain', value: 'remain'},
      {label: 'date created', value: 'date'},
    ];

    return (
      <div>
        <div className="project-results-header">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-7 col-lg-8">
                <CategoriesFilter
                  selectedCategory={selectedCategory}
                  categories={categories}
                  dispatch={this.props.dispatch}
                  query={query}
                />
              </div>
              {/*<MediaQuery query='(min-width: 769px)' className="col-sm-6 col-md-5 col-lg-4 project-filters">*/}
                {/*<TextFilterDropdown options={projectFilterOptions} filter="type" query={query} />*/}
                {/*<TextFilterDropdown prefix="sort by " options={projectSortOptions} filter="sort" query={query} />*/}
              {/*</MediaQuery>*/}
            </div>
          </div>
        </div>
        {/*<MediaQuery query='(max-width: 768px)' className="col-sm-4">*/}
          {/*<div className="container">*/}
            {/*<div className="raw">*/}
              {/*<div className="col-sm-12">*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</MediaQuery>*/}
      </div>
    );
  }
}

ProjectListFilters.propTypes = {};

ProjectListFilters.defaultProps = {};

export default ProjectListFilters;