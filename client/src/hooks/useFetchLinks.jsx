import { useState, useEffect } from 'react';
import { fetchLinks } from '../api';
import { toast } from 'react-hot-toast';

const useFetchLinks = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    toast.promise(
      fetchLinks()
        .then(response => {
          setLinks(response.data.links);
        }),
      {
        pending: 'Fetching links...',
        success: 'Links fetched successfully!',
        error: 'Error fetching links'
      }
    );
  }, []);

  return { links };
};

export default useFetchLinks;