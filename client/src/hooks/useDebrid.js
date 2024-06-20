import { useState } from "react";
import axios from "axios";

export function useDebrid() {
  const [debridResult, setDebridResult] = useState(null);
  // TODO Simplify this big bullsh*t but keep it working

  const debrid = (magnetLinkOrFile) => {
    if (typeof magnetLinkOrFile === 'string') {
      // Handle magnet link
      getMagnetID(magnetLinkOrFile);
    } else {
      // Handle file
      // TODO Keep debrid func simple: getMagnetID => debridMagnet
      const formData = new FormData();
      formData.append('file', magnetLinkOrFile);

      axios
        .post("/api/debrid/getMagnetID", formData, {
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
    }
  };

  const getMagnetID = async (input) => {
    const apiKey = localStorage.getItem("apiKey");
    let data;
    let headers;

    if (typeof input === 'string') {
      // Handle magnet link
      data = { magnetLink: input };
      headers = { 'api-key': apiKey };
    } else {
      // Handle file
      data = new FormData();
      data.append('torrent', input);
      headers = { 'api-key': apiKey };
    }

    try {
      const response = await axios.post('/api/debrid/getMagnetID', data, { headers });
      console.log("Magnet ID received: ", response.data.id);
      debridMagnet(response.data.id);
    } catch (error) {
      console.error("Error getting magnet ID: ", error);
    }
  };

  const debridMagnet = async (magnetID) => {
    try {
      const response = await axios.post("/api/debrid/debridMagnet", { magnetID });
      setDebridResult(response.data);
      console.log("Magnet link debrided successfully");
    } catch (error) {
      console.error("Error debriding magnet link: ", error);
    }
  };

  return { debrid, debridResult };
}