import React, {PropTypes} from 'react';

class TabContainer extends React.Component {

  render() {
    const {show, activeTab, name} = this.props;
    if (!show && activeTab !== name) {
      return null;
    }
    return (
      <div className="col-md-12">
        {this.props.children}
      </div>
    );
  }

}

TabContainer.propTypes = {
  name: React.PropTypes.string.isRequired,
  activeTab: React.PropTypes.string,
  show: React.PropTypes.bool,
};

TabContainer.defaultProps = {
  activeTab: '',
  show: false,
};

export default TabContainer;