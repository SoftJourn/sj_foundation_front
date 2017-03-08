import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class Updates extends React.Component {

  render() {
    const {updates, showAddButton} = this.props;
    return (
      <div>
        {showAddButton && <Link to={`${this.props.mainUrl}addUpdate`}>+add update</Link>}
        {updates.map(update => {
          return(
            <div className="comment-box" key={update.id}>
              <div dangerouslySetInnerHTML={{__html: update.content}} />
            </div>
          );
        })}
      </div>
    );
  }

}

Updates.propTypes = {
  updates: PropTypes.array,
  showAddButton: PropTypes.bool,
};

Updates.defaultProps = {
  updates: [],
  showAddButton: false,
};

export default Updates;