import { useEffect } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { FileUpload, DebridResultTable } from "../../components";
import { useDebrid, useDebridState } from "../../hooks";

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
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page.</p>
      <FileUpload file={file} setFile={setFile} disabled={isFileDisabled} uploadProgress={uploadProgress} />

      {/* TODO Add button to see current supported hosts by AD ? */}
      {/* TODO Waiting for https://github.com/nextui-org/nextui/issues/2112 */}
      <Textarea
        label="Links/Magnets"
        placeholder="Enter links/magnets to debrid"
        onChange={(e) => setLinks(e.target.value)}
        onClear={() => setLinks("")}
        isDisabled={isLinksDisabled}
      />

      <Button
        onClick={() => debrid(file || links)}
        radius="full"
        isDisabled={!file && !links}
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        Debrid
      </Button>

      {debridResult && <DebridResultTable debridResult={debridResult} />}
    </div>
  );
}

export default Home;