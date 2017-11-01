import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class StartProjectMainForm extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h4>Create Project</h4>
        <hr/>
        <p>
          <label>Project name</label>
        </p>
        <p>
          <input type="text" />
        </p>
        <p>
          <label>Category</label>
        </p>
        <p>
          <select>
            <option>social</option>
            <option>office</option>
            <option>health</option>
          </select>
        </p>
        <div>
          <Editor/>
        </div>
        <button className="button">Save Draft</button>
      </div>
    );
  }
}

export default StartProjectMainForm;