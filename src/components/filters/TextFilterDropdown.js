import React, {PropTypes} from 'react';
import {MenuList, MenuButton, Dropdown, MenuItem} from 'react-menu-list';
import classNames from 'classnames';
import { Link } from 'react-router';

class TextFilterDropdown extends React.Component {

  getActiveItem() {
    const {options, query, filter} = this.props;
    let label = 'any project';
    options.forEach(option => {
      if (option.value == query[filter]) {
        label = option.label;
      }
    });
    return label;
  }

  render() {
    const {options, query, filter, prefix} = this.props;
    return(
      <MenuButton className={classNames('btn btn-link')}
        menu={
          <Dropdown>
            <MenuList>
              {options.map(option => {
                let newQuery = { ...query};
                newQuery[filter] = option.value;
                return (
                  <MenuItem key={option.value}>
                    <Link to={{ pathname: '/search', query: newQuery }} className="btn btn-link">
                      {option.label}
                    </Link>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Dropdown>
        }
      >
        {prefix}<b>{this.getActiveItem()}</b> &#9662;
      </MenuButton>
    );
  }

}

TextFilterDropdown.propTypes = {};

TextFilterDropdown.defaultProps = {};

export default TextFilterDropdown;