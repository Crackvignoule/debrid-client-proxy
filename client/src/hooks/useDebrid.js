import { toast } from 'react-hot-toast';
import { useState } from "react";
import axios from "axios";

function isValidMagnetLink(link) {
  const magnetURI = /^magnet:\?xt=urn:btih:[a-zA-Z0-9]{40,}/;
  return magnetURI.test(link);
}

function validateInput(magnetLinkOrFile) {
  if (typeof magnetLinkOrFile === 'string') {
    if (magnetLinkOrFile.startsWith('magnet:?')) {
      if (!isValidMagnetLink(magnetLinkOrFile)) {
        toast.error('Invalid magnet link');
        return false;
      }
    } else {
      toast.error('Input is not a valid magnet link');
      return false;
    }
  }
  return true;
}

export function useDebrid() {
  const [debridResult, setDebridResult] = useState(null);
  // TODO Add error toast when debrid fails (wrong api or other reasons)

    const debrid = (magnetLinkOrFile) => {
      if (!validateInput(magnetLinkOrFile)) {
        return;
      }

    const debridPromise = getMagnetID(magnetLinkOrFile)
      .then(magnetID => debridMagnet(magnetID))
      .then(result => {
        setDebridResult(result);
        return result;
      })
      .catch(error => {
        console.error("Error in debrid process: ", error);
        throw error; // Ensure the error is re-thrown so the toast.promise can catch it
      });
  
    toast.promise(
      debridPromise,
      {
        loading: 'Debriding...',
        success: <b>Debrid process completed successfully!</b>,
        error: <b>Could not debrid.</b>,
      }
    );
  };

  const getMagnetID = async (input) => {
    const apiKey = localStorage.getItem("apiKey");
    let data;
    let headers = { 'api-key': apiKey };

    if (typeof input === 'string') {
      // Handle magnet link
      data = { magnetLink: input };
    } else {
      // Handle file
      data = new FormData();
      data.append('torrent', input);
    }

    try {
      const response = await axios.post('/api/debrid/getMagnetID', data, { headers });
      console.log("Magnet ID received: ", response.data.id);
      return response.data.id;
    } catch (error) {
      console.error("Error getting magnet ID: ", error);
      throw error;
    }
  };

  const debridMagnet = async (magnetID) => {
    const proxyEndpoint = `/api/debrid/getLinksFromMagnet`;
    const apiKey = localStorage.getItem('apiKey');
    const headers = { 'api-key': apiKey };
  
    try {
      const response = await axios.post(proxyEndpoint, { magnetID }, { headers });
      const links = response.data.links;
      const debridedLinks = await debridLinks(links.map(linkObj => linkObj.link));

    const result = links.map((linkObj, index) => {
      return {
        filename: linkObj.filename,
        debridedLink: debridedLinks[index]
      };
    });

    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

  const debridLinks = async (links) => {
    const apiKey = localStorage.getItem('apiKey');
    const headers = { 'api-key': apiKey };
    const proxyEndpoint = `/api/debrid/debridLinks`;

    try {
      const response = await axios.post(proxyEndpoint, { links }, { headers });
      return response.data.debridedLinks;
    } catch (error) {
      console.error('Error:', error);
    }
  }

    

  return { debrid, debridResult };
}
