import { useDropzone } from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import "./FileUpload.scss";

function FileUpload() {
  const [file, setFile] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/x-bittorrent": [".torrent"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const uploadFile = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("/api/upload", formData, {
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload progress: ",
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            );
          },
        })
        .then(() => {
          console.log("File uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
        });
    }
  };

  // TODO Implement progress bar using 

  return (
    <div>
      <div className="file-upload" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {file && <p>Selected file: {file.name}</p>}
      </div>
      <button onClick={uploadFile}>Debrid</button>
    </div>
  );
}

export default FileUpload;
