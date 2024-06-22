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
  }, [file, links]);

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
          />
        </div>
      </div>
      <div className="button-container">
        <Button
          onClick={() => debrid(file || links)}
          radius="full"
          isDisabled={!file && !links}
          className="relative inline-block px-4 py-2 font-medium text-white rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out hover:rotate-gradient"
        >
          Debrid
        </Button>
      </div>
      {debridResult && <DebridResultTable debridResult={debridResult} />}
    </div>
  );
}

export default Home;