import { useState } from "react";
import { toast } from 'react-hot-toast';
import { getMagnetID, debridLinks, debridMagnet } from '../api';


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

  return { debrid, debridResult };
}
