import { useState } from 'react';

function useDebridState() {
  const [file, setFile] = useState();
  const [magnetLink, setMagnetLink] = useState("");
  const [links, setLinks] = useState('');
  const [isFileDisabled, setIsFileDisabled] = useState(false);
  const [isMagnetLinkDisabled, setIsMagnetLinkDisabled] = useState(false);
  const [isLinksDisabled, setIsLinksDisabled] = useState(false);

  return { 
    file, 
    setFile, 
    magnetLink, 
    setMagnetLink, 
    links, 
    setLinks, 
    isFileDisabled, 
    setIsFileDisabled, 
    isMagnetLinkDisabled, 
    setIsMagnetLinkDisabled, 
    isLinksDisabled, 
    setIsLinksDisabled
  };
}

export default useDebridState;