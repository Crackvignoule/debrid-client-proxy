import { useEffect, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { FileUpload, DebridResultTable } from "../../components";
import { useDebrid, useDebridState } from "../../hooks";
import { useLocation } from 'react-router-dom';
import "./Home.scss";

function Home() {
  const { 
    file, 
    setFile,
    links, 
    setLinks, 
    isFileDisabled, 
    setIsFileDisabled,
    isLinksDisabled, 
    setIsLinksDisabled
  } = useDebridState();
  const { debrid, debridResult, uploadProgress } = useDebrid();
  const location = useLocation();
  const [isDebridTriggered, setIsDebridTriggered] = useState(false);

  useEffect(() => {
    setIsLinksDisabled(!!file);
    setIsFileDisabled(!!links);
  }, [file, links, setIsFileDisabled, setIsLinksDisabled]);

  useEffect(() => {
    if (location.state?.link && !isDebridTriggered) {
      setLinks(location.state.link);
      debrid(location.state.link);
      setIsDebridTriggered(true);
      window.history.replaceState(null, ''); // clear location state
    }
  }, [location.state, setLinks, debrid, isDebridTriggered]);

  return (
    <div className="container">
      <div className="inputs-container">
        <div className="file-upload-container">
          <FileUpload
            file={file}
            setFile={setFile}
            disabled={isFileDisabled}
            uploadProgress={uploadProgress}
          />
        </div>
        <div className={`textarea-container ${isLinksDisabled ? 'is-disabled' : ''}`}>
          <Textarea
            label="Links/Magnets"
            placeholder="Enter links/magnets to debrid"
            className="caret-rich-black"
            onChange={(e) => setLinks(e.target.value)}
            onClear={() => setLinks("")}
            isDisabled={isLinksDisabled}
            minRows={7}
            maxRows={7}
            value={links}
          />
        </div>
      </div>
      <div className="button-container">
        <Button
          onClick={() => debrid(file || links)}
          radius="full"
          isDisabled={!file && !links}
          className="mb-3 bg-gradient-to-tr from-indigo-500 from-10% via-cerulean via-50% to-turquoise to-90%"
        >
          Debrid
        </Button>
      </div>
      {debridResult && <DebridResultTable debridResult={debridResult} />}
    </div>
  );
}

export default Home;
