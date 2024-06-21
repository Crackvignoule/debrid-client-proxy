import { toast } from 'react-hot-toast';
import { useState } from "react";
import axios from "axios";
import { getMagnetID } from '../api';


function isValidMagnetLink(link) {
  const magnetURI = /^magnet:\?xt=urn:btih:[a-zA-Z0-9]{40,}/;
  return magnetURI.test(link);
}


export function useDebrid() {
  const [debridResult, setDebridResult] = useState([]);

  const debrid = (linksOrFile) => {
    // Split the input by newline if it's a string
    const linksOrFiles = typeof linksOrFile === 'string' ? linksOrFile.split('\n') : [linksOrFile];
    
    // Filter out empty lines
    const filteredLinksOrFiles = linksOrFiles.filter(linkOrFile => {
      if (typeof linkOrFile === 'string') {
        return linkOrFile.trim() !== '';
      }
      return true; // Keep the file objects
    });

    // Map each link or file to a promise
    const debridPromises = filteredLinksOrFiles.map(linkOrFile => {
      if (typeof linkOrFile === 'string' && !isValidMagnetLink(linkOrFile)) {
        // Handle URL
        return debridLinks([linkOrFile])
          .then(result => {
            setDebridResult(prevResult => [...prevResult, ...result]);
            return result;
          });
      } else {
        // Handle magnet link or file
        return getMagnetID(linkOrFile)
          .then(magnetID => {
            if (magnetID === null) {
              throw new Error('Failed to get magnet ID');
            }
            return debridMagnet(magnetID);
          })
          .then(result => {
            setDebridResult(prevResult => [...prevResult, ...result]);
            return result;
          });
      }
    });
  
    // Wait for all promises to resolve
    const debridPromise = Promise.all(debridPromises);
  
    toast.promise(
      debridPromise,
      {
        loading: 'Debriding...',
        success: <b>Debrid process completed successfully!</b>,
        error: <b>Could not debrid.</b>,
      }
    );
  };

  

  const debridMagnet = async (magnetID) => {
    const proxyEndpoint = `/api/debrid/getLinksFromMagnet`;
    const apiKey = localStorage.getItem('apiKey');
    const headers = { 'api-key': apiKey };
  
    try {
      console.log(magnetID);
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
      const response = await axios.post(proxyEndpoint, { links }, { headers });
      const debridedLinks = response.data.debridedLinks;
      const result = debridedLinks.map(
        ({ data: { filename, link } }, index) => ({
          filename,
          link: links[index],
          debridedLink: link,
        })
      );
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

    

  return { debrid, debridResult };
}
