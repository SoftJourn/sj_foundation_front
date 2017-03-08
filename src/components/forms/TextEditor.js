import React, {Component} from 'react';
import TinyMCE from 'react-tinymce';


class TextEditor extends Component {

    constructor(props) {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
            <TinyMCE
                content=""
                config={{
                    selector: "#textEditor",
                    theme: 'modern',
                    menubar: false,
                    height: 400,
                    plugins: [
                        'advlist autolink lists link image charmap preview hr anchor pagebreak',
                        'searchreplace visualblocks visualchars code fullscreen',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'template paste textcolor colorpicker textpattern imagetools toc',
                    ],
                    toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
                    toolbar2: 'link image media | preview'
                }}
                />
            </div>
        )
    }
}

module.exports = TextEditor;

