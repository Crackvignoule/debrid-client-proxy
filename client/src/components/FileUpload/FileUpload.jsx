import React from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "@nextui-org/react";
import { Upload } from 'lucide-react';
import "./FileUpload.scss";


function FileUpload({ file, setFile, disabled, uploadProgress }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/x-bittorrent": [".torrent"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    disabled
  });
  // Conditional class or style
  const dropzoneClass = `file-upload ${disabled ? "disabled" : ""} ${isDragActive ? "hover-style" : ""}`;

  return (
    <div>
      <div
        className={dropzoneClass}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Upload size={24} />
        <p>Upload File</p>
        {file && <p>Selected file: {file.name}</p>}
      </div>
      <Progress
        size="sm"
        radius="sm"
        classNames={{
          base: "max-w-md",
          track: "drop-shadow-md",
          indicator: "bg-gradient-to-r from-indigo-500 from-20% via-cerulean via-50% to-turquoise to-90%",
          label: "tracking-wider font-medium text-cadet-grey",
          value: "text-cadet-grey",
        }}
        label="Upload Progress"
        value={uploadProgress}
        showValueLabel={true}
      />
    </div>
  );
}

export default FileUpload;