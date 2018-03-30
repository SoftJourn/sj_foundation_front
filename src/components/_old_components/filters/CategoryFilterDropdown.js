import React, {PropTypes} from 'react';
import {MenuList, MenuButton, Dropdown, MenuItem} from 'react-menu-list';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
class CategoryFilterDropdown extends React.Component {

  getLabel() {
    const {items, query} = this.props;
    let selectedItem = false;
    items.map(value => {
      if (encodeURI(value.slug) == query.category) {
        selectedItem = value.name;
      }
    });
    return selectedItem;
  }

  render() {
    const {items, selectedCategory, query} = this.props;
    if (items.length == 0) {
      return null;
    }

    return(
      <MenuButton className={classNames('btn btn-link', {active: this.getLabel()})}
        menu={
          <Dropdown>
            <MenuList>
              {items.map(category => {
                if (category.slug === 'uncategorized' || category.count == 0 || encodeURI(category.slug) == selectedCategory) {
                  return null
                }
                const buttonClass = classNames('btn btn-link');
                return (
                  <MenuItem key={category.id}>
                    <NavLink
                      to={{pathname: '/search', query: {...query, category: category.slug} }}
                      className={buttonClass}
                    >
                      {category.name}
                      </NavLink>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Dropdown>
        }
      >
        {this.getLabel() ? this.getLabel() : 'more'} &#9662;
      </MenuButton>
    )
  }

}

CategoryFilterDropdown.propTypes = {};

CategoryFilterDropdown.defaultProps = {};

export default CategoryFilterDropdown;