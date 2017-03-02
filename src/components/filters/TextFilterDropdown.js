import React, {PropTypes} from 'react';
import {MenuList, MenuButton, Dropdown, MenuItem} from 'react-menu-list';
import classNames from 'classnames';

class TextFilterDropdown extends React.Component {

  render() {
    const {options} = this.props;
    return(
      <MenuButton className={classNames('btn btn-link')}
        menu={
          <Dropdown>
            <MenuList>
              {options.map(option => {
                return (
                  <MenuItem>{option.label}</MenuItem>
                );
              })}
            </MenuList>
          </Dropdown>
        }
      >
        any project &#9662;
      </MenuButton>
    );
  }

}

TextFilterDropdown.propTypes = {};

TextFilterDropdown.defaultProps = {};

export default TextFilterDropdown;