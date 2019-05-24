import React, { Component, Fragment, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function AcceptVideo(props) {
    const onDrop = useCallback(acceptedFiles => {
        props.files.push(acceptedFiles[0]);
    });

    const {acceptedFiles, rejectedFiles, getRootProps, getInputProps} = useDropzone({
        accept: 'video/*',
        multiple: true,
        onDrop
    });

    const removeVideo = useCallback((e) => {
        e.stopPropagation()
        props.files.pop()
        acceptedFiles.pop()
    });

    var content = ''
    if (acceptedFiles.length > 0) {
        content = acceptedFiles.map(acceptedFile => (
            <span key={acceptedFile.name} className="uploaded-file">
                {acceptedFile.name}
                <i className="fas fa-times" onClick={removeVideo}></i>
            </span>
        ))
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
