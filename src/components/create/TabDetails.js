import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class TabDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col tab-inner">
                    <div>
                        <label>Project Description</label>
                        <Editor editorClassName="editorClass"
                                toolbar={{
                                    options: ['inline', 'blockType', 'fontSize',
                                        'list', 'textAlign', 'link', 'remove', 'history']
                                }}/>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-prime">Next</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default TabDetails;