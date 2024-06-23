import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getMagnetID, debridLinks, debridMagnet } from '../api';
import { Button } from "@nextui-org/react";


function isValidMagnetLink(link) {
  const magnetURI = /^magnet:\?xt=urn:btih:[a-zA-Z0-9]{40,}/;
  return magnetURI.test(link);
}

export function useDebrid() {
  const [debridResult, setDebridResult] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  
  const debrid = (linksOrFile) => {
    // Split links by newline + Filter out empty newlines
    const linksOrFiles = typeof linksOrFile === 'string' ? linksOrFile.split('\n') : [linksOrFile];
    const filteredLinksOrFiles = linksOrFiles.filter(linkOrFile => {
      if (typeof linkOrFile === 'string') {
        return linkOrFile.trim() !== '';
      }
      return true; // file path doesn't need to be filtered
    });

    // Debrid each link or file (mapping each to a promise)
    const debridPromises = filteredLinksOrFiles.map(linkOrFile => {
      // If it's a link
      if (typeof linkOrFile === 'string' && !isValidMagnetLink(linkOrFile)) {
        return debridLinks([linkOrFile])
          .then(result => {
            setDebridResult(prevResult => [...prevResult, ...result]);
            return result;
          });
      } else {
        // If it's a file, track upload progress
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
            if (result.isPending) {
              // toast.custom(t => (
              //   <div>
              //     <ToastBar toast={t}>
              //       {/* Default content */}
              //       <span>A Torrent is Pending...</span>
              //     </ToastBar>
              //     <button onClick={() => {
              //       navigate('/pending-torrents');
              //       toast.dismiss(t.id); // Optionally dismiss the toast on click
              //     }}>
              //       Go to Pending Torrents
              //     </button>
              //   </div>
              // ), {
              //   icon: '⏳',
              // });
              // return result;  // Resolve the promise even if pending
              // toast.custom((t) => (
              //   <div
              //     className={`bg-white px-6 py-4 shadow-md rounded-full`}
              //   >
              //     Hello World
              //   </div>
              // ));
              toast((t) => (
                <div>
                  ⏳ A Torrent is Pending...
                  <Button
                    className="ml-1 min-w-0 min-h-0 h-8 w-8" //p-0 text-xs inline-flex items-center justify-center
                    isIconOnly
                    onClick={() => {
                      navigate("/pending-torrents");
                      toast.dismiss(t.id); // Optionally dismiss the toast on click
                    }}
                  >
                    <ExternalLink size={20}/>
                  </Button>
                </div>
              ));
              return result;
            } else {
              setDebridResult(prevResult => [...prevResult, ...result]);
              return result;
            }
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
