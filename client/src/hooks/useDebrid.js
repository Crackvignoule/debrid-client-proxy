import { useState } from "react";
import axios from "axios";

export function useDebrid() {
  const [debridResult, setDebridResult] = useState(null);
  // TODO Add promise toast
  // TODO When debrid will take normal links, I should review the whole blocking input logic and debrid would take magnetOrTorrentOrLinks

const debrid = async (magnetLinkOrFile) => {
  try {
    const magnetID = await getMagnetID(magnetLinkOrFile);
      const result = await debridMagnet(magnetID);
      setDebridResult(result);
    } catch (error) {
      console.error("Error in debrid process: ", error);
    }
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
