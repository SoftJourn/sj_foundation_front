import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withHeader } from 'components/HOC/HeaderDecorator';
import ProjectStatus from './ProjectStatus'
import ProjectProgressBar from './ProjectProgressBar'
import ProjectTitle from './ProjectTitle'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class Step3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty()
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState
        })
    }

    render() {
        var editorContent = "Write about your project like you're explaining it to a friend..."
        return (
            <div className="container-fluid start-project-step3">
                <ProjectStatus />
                <ProjectProgressBar step="3" status="75" />
                <ProjectTitle title="Project Description" />

                <div className="row project-description-label justify-content-around">
                    <div className="col col-sm-6">
                        Project Text Description
                    </div>
                </div>
                <div className="row project-description justify-content-around">
                    <div className="col col-sm-6">
                        <Editor
                            placeholder={editorContent}
                            editorState={this.state.editorState}
                            wrapperClassName="description-wrapper"
                            editorClassName="description-editor"
                            onEditorStateChange={this.onEditorStateChange}
                            toolbar={{
                                inline: { inDropdown: false },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                image: { inDropdown: true }
                            }}
                        />
                    </div>
                </div>
                <div className="row project-files-label justify-content-center">
                    <div className="col col-sm-3">
                        Project Image
                    </div>
                    <div className="col col-sm-3">
                        Project Attachments
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(withHeader(Step3))
