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

  const getMagnetID = (magnetOrTorrent) => {
    const apiKey = localStorage.getItem("apiKey");
  
    if (typeof magnetOrTorrent === 'string') {
      // Handle magnet link
      axios
        .post('/api/debrid/getMagnetID', {
          magnetLink: magnetOrTorrent
        }, {
          headers: {
            'api-key': apiKey
          }
        })
        .then((response) => {
          console.log("Magnet ID received: ", response.data.id);
          debridMagnet(response.data.id);
        })
        .catch((error) => {
          console.error("Error getting magnet ID: ", error);
        });
    } else {
      // Handle file
      const formData = new FormData();
      formData.append('file', magnetOrTorrent);
  
      axios
        .post("/api/debrid/getMagnetID", formData, {
          headers: {
            'api-key': apiKey,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log("Magnet ID received: ", response.data.id);
          debridMagnet(response.data.id);
        })
        .catch((error) => {
          console.error("Error getting magnet ID: ", error);
        });
    }
  };

  const debridMagnet = (magnetID) => {
    axios
      .post("/api/debrid/debridMagnet", { magnetID })
      .then((response) => {
        setDebridResult(response.data);
        console.log("Magnet link debrided successfully");
      })
      .catch((error) => {
        console.error("Error debriding magnet link: ", error);
      });
  };

  return { debrid, debridResult };
}