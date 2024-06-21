import { toast } from 'react-hot-toast';
import { useState } from "react";
import axios from "axios";

function isValidMagnetLink(link) {
  const magnetURI = /^magnet:\?xt=urn:btih:[a-zA-Z0-9]{40,}/;
  return magnetURI.test(link);
}


export function useDebrid() {
  const [debridResult, setDebridResult] = useState(null);
  // TODO Add error toast when debrid fails (wrong api or wrong links...)
  // TODO Update debridResult in real-time as the debrid process progresses

  const debrid = (linksOrFile) => {

    let debridPromise;
    if (typeof linksOrFile === 'string' && !linksOrFile.startsWith('magnet:?')) {
      // Handle URL
      debridPromise = debridLinks([linksOrFile])
        .then(result => {
          setDebridResult(result);
          return result;
        });
    } else {
      // Handle magnet link or file
      debridPromise = getMagnetID(linksOrFile)
        .then(magnetID => {
          if (magnetID === null) {
            throw new Error('Failed to get magnet ID');
          }
          return debridMagnet(magnetID);
        })
        .then(result => {
          setDebridResult(result);
          return result;
        });
    }
  
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
      
      return debridedLinks;
  } catch (error) {
    console.error('Error:', error);
  }
};

  const debridLinks = async (links) => {
    const apiKey = localStorage.getItem('apiKey');
    const headers = { 'api-key': apiKey };
    const proxyEndpoint = `/api/debrid/debridLinks`;

    try {
      // console.log('Debriding links:', links);
      const response = await axios.post(proxyEndpoint, { links }, { headers });
      const debridedLinks = response.data.debridedLinks;

      const result = links.map((linkObj, index) => {
        return {
          filename: linkObj.filename,
          debridedLink: debridedLinks[index]
        };
      });
      console.log('Debrided links:', result);
      return result;
    } catch (error) {
      console.error('Error:', error);
    }
  }

    

  return { debrid, debridResult };
}
