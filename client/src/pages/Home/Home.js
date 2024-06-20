import { useEffect } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { FileUpload, DebridResultTable } from "../../components";
import { useDebrid, useDebridState } from "../../hooks";

function Home() {
  // TODO Simplify this big block of usestates by using a single object
  const { 
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
  } = useDebridState();
  const { debrid, debridResult } = useDebrid();



  useEffect(() => {
    setIsMagnetLinkDisabled(!!file || !!links);
    setIsLinksDisabled(!!file || !!magnetLink);
    setIsFileDisabled(!!magnetLink || !!links);
  }, [file, magnetLink, links]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page.</p>
      {/* TODO Add a check to check valid magnet link */}
      <FileUpload file={file} setFile={setFile} disabled={isFileDisabled} />

      <Input
        variant="faded"
        isClearable
        label="Magnet Link"
        onChange={(e) => setMagnetLink(e.target.value)}
        onClear={() => setMagnetLink("")}
        disabled={isMagnetLinkDisabled}
      />

      {/* TODO Add button to see current supported hosts by AD ? */}
      <Textarea
        label="Links"
        placeholder="Enter links to debrid"
        onChange={(e) => setLinks(e.target.value)}
        onClear={() => setLinks("")}
        disabled={isLinksDisabled}
      />

      <Button
        onClick={() => debrid(magnetLink || file || links)}
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        Debrid
      </Button>

      {debridResult && <DebridResultTable debridResult={debridResult} />}
    </div>
  );
}

export default Home;