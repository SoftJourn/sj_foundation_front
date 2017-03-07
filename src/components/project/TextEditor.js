import React, {Component} from 'react';
import TinyMCE from 'react-tinymce';
import {createUpdate} from '../../actions/updateActions';


class TextEditor extends Component {

    constructor(props) {
        super();
        this.state = {}
    }


    handleEditorChange() {
        const textEditorContent = tinyMCE.activeEditor.getContent();
        //console.log('Content was updated:', tinyMCE.activeEditor.getContent());
        this.props.dispatch(createUpdate(
            this.props.projectId,
            textEditorContent
        ));

        this.setState({
            active: false,
        });
        console.log(textEditorContent);
    }

    render() {
        const handleEditorChange = this.handleEditorChange.bind(this);
        return (
            <div>
            <TinyMCE
                content="<p>This is the initial content of the editor</p>"
                config={{
                    selector: "#textEditor",
                    theme: 'modern',
                    menubar: false,
                    height: 500,
                    plugins: [
                        'advlist autolink lists link image charmap preview hr anchor pagebreak',
                        'searchreplace visualblocks visualchars code fullscreen',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'template paste textcolor colorpicker textpattern imagetools toc save',
                    ],
                    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
                    toolbar2: 'preview | | link image media | codesample | save',
                    save_onsavecallback: handleEditorChange
                }}
                />
            </div>
        )
    }
}

module.exports = TextEditor;

