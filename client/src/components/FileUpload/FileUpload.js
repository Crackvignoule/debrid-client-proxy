import {useDropzone} from 'react-dropzone';
import {useState} from 'react';
import './FileUpload.scss';

function FileUpload() {
  const [file, setFile] = useState("");
  const {getRootProps, getInputProps} = useDropzone({
    accept: '.torrent',
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0].name);
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      }).then(() => {
        console.log('File uploaded successfully');
      }).catch((error) => {
        console.error('Error uploading file: ', error);
      });
    },
    onUploadProgress: (progressEvent) => {
      console.log('Upload progress: ', Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%');
    }
  });

  return (
    <div className='file-upload' {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      {file && <p>Selected file: {file}</p>}
    </div>
  );
}

export default FileUpload;