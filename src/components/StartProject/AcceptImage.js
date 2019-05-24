import React, { Component, Fragment, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function AcceptImage(props) {
    const onDrop = useCallback(acceptedFiles => {
        props.files.push(acceptedFiles[0]);
    });

    const {acceptedFiles, rejectedFiles, getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop
    });

    const removeImage = useCallback((e) => {
        e.stopPropagation()
        props.files.pop()
        acceptedFiles.pop()
    });

    var content = ''
    if (acceptedFiles.length > 0) {
        content = acceptedFiles.map(acceptedFile => (
            <span key={acceptedFile.name} className="uploaded-file">
                {acceptedFile.name}
                <i className="fas fa-times" onClick={removeImage}></i>
            </span>
        ))
    } else {
        content = (
            <Fragment>
                <div className="upload-title">Drop an image here, or select a file</div>
                <span className="upload-description">
                    Drop an image here, or select a file.
                    It must be a JPG, PNG, GIF, TIFF or BMP,
                    no larger than 200 MB
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

export default AcceptImage
