import React, { Component, Fragment, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function AcceptVideo(props) {
    const onDrop = useCallback(acceptedFiles => {
        var itemExists = props.getFiles().filter(function (el) {
            return el.name === acceptedFiles[0].name
        })
        if (itemExists.length == 0) {
            props.addFile(acceptedFiles[0]);
        }
    });

    var maxSize = 5120 * 1048576

    const {isDragActive, rejectedFiles, getRootProps, getInputProps} = useDropzone({
        accept: 'video/*',
        multiple: false,
        minSize: 0,
        maxSize,
        onDrop
    });

    const removeFile = useCallback((e) => {
        e.stopPropagation()
        props.removeFile()
    });

    var content = ''
    if (props.getFiles().length > 0) {
        content = props.getFiles().map(acceptedFile => (
            <span
                key={acceptedFile.name + props.videoContainer}
                className={props.videoContainer + " file-present"}
            >
                {acceptedFile.name}
                <i
                    className="fas fa-times"
                    onClick={removeFile}
                ></i>
            </span>
        ))
    } else if (rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize) {
        content = (
            <span
                className={props.videoContainer + " invalid"}
            >
                File is too large
            </span>
        )
    } else {
        content = (
            <Fragment>
                <div className="upload-title">Drop a video here, or select a file</div>
                <span className="upload-description">
                    It must be a MOV, MPEG, AVI, MP4, 3GP, WMV or FLV,
                    no larger than 5120 MB
                </span>
            </Fragment>
        )
    }

    return (
        <section className="fileUploader">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                {content}
            </div>
        </section>
    );
}

export default AcceptVideo
