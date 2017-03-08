import React, {PropTypes} from 'react';
import TextEditor from './TextEditor';
import {createUpdateAndRedirect} from '../../actions/updateActions';

class AddUpdateForm extends React.Component {

  constructor(props) {
    super(props);
    this.addUpdate = this.addUpdate.bind(this);
  }

  addUpdate() {
    const textEditorContent = tinyMCE.activeEditor.getContent();
    const redirectUrl = `${this.props.mainUrl}updates`;
    const projectId = this.props.projectId;

    this.props.dispatch(createUpdateAndRedirect(
      projectId,
      textEditorContent,
      redirectUrl
    ));
  }

  render() {
    return (
      <div>
        <h4>Add update</h4>
        <TextEditor />
        <button
          className="btn btn-default"
          onClick={this.addUpdate}
        >
          Publish
        </button>
      </div>
    );
  }

}

AddUpdateForm.propTypes = {};

AddUpdateForm.defaultProps = {};

export default AddUpdateForm;