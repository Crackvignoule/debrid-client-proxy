import { useState } from "react";
import axios from "axios";

export function useDebrid() {
  const [debridResult, setDebridResult] = useState(null);

  const getMagnetID = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post("/api/getMagnetID", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        debridMagnet(response.data.magnetID);
      })
      .catch((error) => {
        console.error("Error getting magnet ID: ", error);
      });
  };

  const debridMagnet = (magnetID) => {
    axios
      .post("/api/debridMagnet", { magnetID })
      .then((response) => {
        setDebridResult(response.data);
        console.log("Magnet link debrided successfully");
      })
      .catch((error) => {
        console.error("Error debriding magnet link: ", error);
      });
  };

  return { getMagnetID, debridMagnet, debridResult };
}