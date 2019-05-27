import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withHeader } from 'components/HOC/HeaderDecorator';
import ProjectStatus from './ProjectStatus'
import ProjectProgressBar from './ProjectProgressBar'
import ProjectTitle from './ProjectTitle'
import { EditorState, convertToRaw } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import AcceptImage from './AcceptImage'
import AcceptVideo from './AcceptVideo'
import ProjectButtons from './ProjectButtons'
import { alertActions } from 'actions/alertActions'
import { newProjectStep3 } from 'actions/projectActions'

class Step3 extends Component {
    constructor(props) {
        super(props)

        var editorState
        if (this.props.description === '') {
            editorState = EditorState.createEmpty()
        } else {
            var contentState = stateFromHTML(this.props.description)
            editorState = EditorState.createWithContent(contentState)
        }
        this.state = {
            editorState: editorState,
            projectImage: [],
            projectVideo: [],
            projectAttachments: []
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.nextClickHandler = this.nextClickHandler.bind(this)
        this.prevClickHandler = this.prevClickHandler.bind(this)
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState
        })
    }

    componentWillUnmount() {
        this.state.projectImage.forEach(file => URL.revokeObjectURL(file.preview));
        this.state.projectAttachments.forEach(file => URL.revokeObjectURL(file.preview));
    }

    nextClickHandler() {
        var projectDescription = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        projectDescription = this.trim(projectDescription)
        if (projectDescription.trim() === '') {
            this.props.dispatch(alertActions.error("Project description is empty"));
            window.scrollTo(0,0)
            return;
        }
        this.props.dispatch(newProjectStep3(projectDescription));
        window.scrollTo(0,0)
        this.props.history.push('/step4');
    }

    trim(editorContent) {
        var result = editorContent.trim()
        result = result.substring(3, result.length - 4)
        return result
    }

    prevClickHandler() {
        this.props.history.push('/start');
    }

    render() {
        var editorContent = "Write about your project like you're explaining it to a friend..."
        return (
            <div className="container-fluid start-project-step3">
                <ProjectStatus greenButtons={true} />
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
                                options: ['blockType', 'inline', 'list', 'textAlign', 'link'],
                                inline: {
                                    inDropdown: false,
                                    options: [ 'bold', 'italic' ]
                                },
                                list: {
                                    inDropdown: false,
                                    options: [ 'unordered', 'ordered' ]
                                },
                                blockType: {
                                    inDropdown: true,
                                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code']
                                },
                                textAlign: {
                                    inDropdown: false,
                                    options: ['left', 'center', 'right']
                                },
                                link: {
                                    inDropdown: false
                                }
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
                <div className="row project-images justify-content-center">
                    <div className="col col-sm-3 project-image">
                        <AcceptImage files={this.state.projectImage} multiple={false} />
                    </div>
                    <div className="col col-sm-3 project-image">
                        <AcceptImage files={this.state.projectAttachments} multiple={true} />
                    </div>
                </div>
                <div className="row project-files-label justify-content-center">
                    <div className="col col-sm-6">
                        Project Video
                    </div>
                </div>
                <div className="row project-video justify-content-center">
                    <div className="col col-sm-6 uploaded-video">
                        <AcceptVideo files={this.state.projectVideo} />
                    </div>
                </div>
                <ProjectButtons
                    nextClickHandler={this.nextClickHandler}
                    prevClickHandler={this.prevClickHandler}
                />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        description: state.projects.newProject.description || ''
    };
}

export default connect(mapStateToProps)(withHeader(Step3))
