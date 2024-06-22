import { useEffect } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { FileUpload, DebridResultTable } from "../../components";
import { useDebrid, useDebridState } from "../../hooks";
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


  useEffect(() => {
    setIsLinksDisabled(!!file);
    setIsFileDisabled(!!links);
  }, [file, links, setIsFileDisabled, setIsLinksDisabled]);

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
        <div className="textarea-container">
          <Textarea
            label="Links/Magnets"
            placeholder="Enter links/magnets to debrid"
            onChange={(e) => setLinks(e.target.value)}
            onClear={() => setLinks("")}
            isDisabled={isLinksDisabled}
            minRows={6}
          />
        </div>
      </div>
      <div className="button-container">
        <Button
          onClick={() => debrid(file || links)}
          radius="full"
          isDisabled={!file && !links}
          className="bg-gradient-to-tr from-indigo-500 from-10% via-cerulean via-50% to-turquoise to-90%"
        >
          Debrid
        </Button>
      </div>
      {debridResult && <DebridResultTable debridResult={debridResult} />}
    </div>
  );
}

export default Home;