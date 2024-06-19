import { useDropzone } from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import "./FileUpload.scss";

import { useUpload } from "../../hooks/useUpload";

// TODO Fix, still disabled when erasing magnet content with clear button
// TODO Maybe add a cross to remove the file
// TODO Add a toaster if user is clicking on disabled input

function FileUpload({ file, setFile, disabled }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/x-bittorrent": [".torrent"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    disabled
  });

  return (
    <div>
      <div className="file-upload" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {file && <p>Selected file: {file.name}</p>}
      </div>
    </div>
  );
}

export default FileUpload;