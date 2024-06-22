import { useState } from "react";
import { toast } from 'react-hot-toast';
import { getMagnetID, debridLinks, debridMagnet } from '../api';


function isValidMagnetLink(link) {
  const magnetURI = /^magnet:\?xt=urn:btih:[a-zA-Z0-9]{40,}/;
  return magnetURI.test(link);
}


export function useDebrid() {
  const [debridResult, setDebridResult] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const debrid = (linksOrFile) => {
    // Splint links by newline + Filter out empty newlines
    const linksOrFiles = typeof linksOrFile === 'string' ? linksOrFile.split('\n') : [linksOrFile];
    const filteredLinksOrFiles = linksOrFiles.filter(linkOrFile => {
      if (typeof linkOrFile === 'string') {
        return linkOrFile.trim() !== '';
      }
      return true; // file path doesnt need to be filtered
    });

    // Debrid each link or file (mapping each to a promise)
    const debridPromises = filteredLinksOrFiles.map(linkOrFile => {
      // If its a link
      if (typeof linkOrFile === 'string' && !isValidMagnetLink(linkOrFile)) {
        return debridLinks([linkOrFile])
          .then(result => {
            setDebridResult(prevResult => [...prevResult, ...result]);
            return result;
          });
      } else {
        // If its a file, track upload progress
        const isFile = !(typeof linkOrFile === 'string');
        const onProgress = isFile ? (progress) => {
          setUploadProgress(progress);
        } : undefined;

        // Get magnet ID and debrid
        return getMagnetID(linkOrFile, onProgress) // Pass onProgress only if it's a file
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

  return { debrid, debridResult, uploadProgress };
}
