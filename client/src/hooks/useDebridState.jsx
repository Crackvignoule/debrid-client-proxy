import { useState } from 'react';

function useDebridState() {
  const [files, setFiles] = useState();
  const [links, setLinks] = useState('');
  const [isFileDisabled, setIsFileDisabled] = useState(false);
  const [isLinksDisabled, setIsLinksDisabled] = useState(false);

  return { 
    files, 
    setFiles,
    links, 
    setLinks, 
    isFileDisabled, 
    setIsFileDisabled,
    isLinksDisabled, 
    setIsLinksDisabled
  };
}

export default useDebridState;