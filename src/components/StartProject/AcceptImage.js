import React, { Fragment, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function AcceptImage(props) {
    const onDrop = useCallback(acceptedFiles => {
        var itemExists = props.getFiles().filter(function (el) {
            return el.name === acceptedFiles[0].name
        })
        if (itemExists.length == 0) {
            props.addFile(acceptedFiles[0]);
        }
    })

    var maxSize = 1048576

    const {isDragActive, rejectedFiles, getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        multiple: props.multiple,
        minSize: 0,
        maxSize,
        onDrop
    })

    const removeImage = useCallback((fileName, e) => {
        e.stopPropagation()
        props.removeFile(fileName)
    });


    var content = ''
    if (props.getFiles().length > 0) {
        content = props.getFiles().map(acceptedFile => (
            <span
                key={acceptedFile.name + props.imgContainer}
                className={props.imgContainer + " file-present"}
            >
                {acceptedFile.name}
                <i
                    className="fas fa-times"
                    onClick={(e) => removeImage(acceptedFile.name, e)}
                ></i>
            </span>
        ))
    } else if (rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize) {
        content = (
            <span
                className={props.imgContainer + " invalid"}
            >
                File is too large
            </span>
        )
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
