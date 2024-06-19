import { useState } from "react";
import axios from "axios";

export function useUpload() {
  const [magnetLink, setMagnetLink] = useState("");

  const upload = (input) => {
    if (typeof input === 'string') {
      // It's a magnet link
      axios
        .post("/api/uploadMagnet", { magnetLink: input })
        .then(() => {
          console.log("Magnet link uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading magnet link: ", error);
        });
    } else if (input instanceof File) {
      // It's a file
      const formData = new FormData();
      formData.append("file", input);
  
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

  return { magnetLink, setMagnetLink, upload };
}