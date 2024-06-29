import { toast } from 'react-hot-toast';
import { Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchLinks, saveLinks as apiSaveLinks, deleteLinks as apiDeleteLinks, deleteMagnet as apiDeleteMagnet } from '../api';
import { Undo2 } from 'lucide-react';

const useLinkManagement = () => {
  const location = useLocation();
  const [links, setLinks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);  // Used to trigger re-fetch

  // Removed toast, revert: 4a04cf7:
  useEffect(() => {
    if (location.pathname === "/saved-links") {
      const loadLinks = async () => {
        try {
          const response = await fetchLinks();
          setLinks(response.data.links);
        } catch (error) {
          console.error("Error fetching links", error);
          // Optionally, handle the error (e.g., set an error state, show a different toast, etc.)
        }
      };
  
      loadLinks();
    }
  }, [location.pathname, refreshKey]);

  const saveLinks = (linksToSave) => {
    return toast.promise(apiSaveLinks(linksToSave), {
      loading: "Saving link(s)...",
      success: <b>Link(s) saved successfully!</b>,
      error: <b>Could not save link(s).</b>,
    });
  };

  const deleteLinks = async (linksToDelete) => {
    try {
      await apiDeleteLinks(linksToDelete);
      setRefreshKey((prevKey) => prevKey + 1); // Ensure the refresh key is updated
  
      // Show only the custom toast on success
      toast((t) => (
        <div>
          🗑️ Link Deleted, Revert ?
          <Button
            className="ml-1 min-w-0 min-h-0 h-8 w-8" // Adjust styling as needed
            isIconOnly
            onClick={() => {
              saveLinks(linksToDelete); // Save the links back
              setRefreshKey((prevKey) => prevKey + 1); // Trigger a refresh
              toast.dismiss(t.id); // Dismiss the toast
            }}
          >
            <Undo2 size={20}/> {/* Ensure Undo2 is correctly imported or replaced with an appropriate icon */}
          </Button>
        </div>
      ));
    } catch (error) {
      // Handle error case
      toast.error("Could not delete link(s).");
    }
  };

  const deleteMagnet = async (id) => {
    // doesnt use refreshKey, so no need to update it
    try {
      await apiDeleteMagnet(id);
      toast.success("Magnet deleted successfully!");
    } catch (error) {
      toast.error("Could not delete magnet.");
    }
  };

  return { links, fetchLinks, saveLinks, deleteLinks, setRefreshKey, deleteMagnet };
};

export default useLinkManagement;