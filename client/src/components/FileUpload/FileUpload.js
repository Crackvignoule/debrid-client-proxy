import { useDropzone } from "react-dropzone";
import { Progress } from "@nextui-org/react";
import "./FileUpload.scss";

// TODO Add a toaster if user is clicking on disabled input

function FileUpload({ file, setFile, disabled, uploadProgress }) {
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
      <div
        className={`file-upload ${disabled ? "disabled" : ""}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {file && <p>Selected file: {file.name}</p>}
      </div>
      <Progress
        size="sm"
        radius="sm"
        classNames={{
          base: "max-w-md",
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        label="Upload Progress"
        value={uploadProgress}
        showValueLabel={true}
      />
    </div>
  );
}

export default FileUpload;