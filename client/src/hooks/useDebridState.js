import { useState } from 'react';

function useDebridState() {
  const [file, setFile] = useState();
  const [links, setLinks] = useState('');
  const [isFileDisabled, setIsFileDisabled] = useState(false);
  const [isLinksDisabled, setIsLinksDisabled] = useState(false);

  return { 
    file, 
    setFile,
    links, 
    setLinks, 
    isFileDisabled, 
    setIsFileDisabled,
    isLinksDisabled, 
    setIsLinksDisabled
  };
}

export default useDebridState;