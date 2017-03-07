import React, {PropTypes} from 'react';

class Updates extends React.Component {

  render() {
    const {updates} = this.props;
    return (
      <div>
        {updates.map(update => {
          return(
            <div className="comment-box">
              <div dangerouslySetInnerHTML={{__html: update.content}} />
            </div>
          );
        })}

      </div>
    );
  }

}

Updates.propTypes = {
  updates: PropTypes.array
};

Updates.defaultProps = {
  updates: []
};

export default Updates;