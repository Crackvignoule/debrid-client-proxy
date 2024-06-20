import { useState } from 'react';

function useDebridState() {
  const [file, setFile] = useState();
  const [magnetLink, setMagnetLink] = useState("");

  return { file, setFile, magnetLink, setMagnetLink };
}

export default useDebridState;