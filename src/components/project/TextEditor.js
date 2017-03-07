import React, {Component} from 'react';
import TinyMCE from 'react-tinymce';

class TextEditor extends Component {

    constructor(props) {
        super();
        this.state = {}
    }

    handleEditorChange() {
        console.log('Content was updated:', tinyMCE.activeEditor.getContent())
    }

    render() {

        return (
            <div>
            <TinyMCE
                content="<p>This is the initial content of the editor</p>"
                config={{
                    selector: "#textEditor",
                    theme: 'modern',
                    plugins: [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                        'searchreplace wordcount visualblocks visualchars code fullscreen',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc save',
                    ],
                    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    toolbar2: 'print preview media | forecolor backcolor emoticons | codesample | save',
                    save_onsavecallback: this.handleEditorChange
                }}
                />
            </div>
        )
    }
}

module.exports = TextEditor;

