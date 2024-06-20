import { Input, Button } from "@nextui-org/react";
import { FileUpload, DebridResultTable } from "../../components";
import { useDebrid, useDebridState } from "../../hooks";

function Home() {
  const { file, setFile, magnetLink, setMagnetLink } = useDebridState();
  const { debrid, debridResult } = useDebrid();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page.</p>
      <FileUpload file={file} setFile={setFile} disabled={!!magnetLink} />

      <Input
        variant="faded"
        isClearable
        label="Magnet Link"
        onChange={(e) => setMagnetLink(e.target.value)}
        disabled={!!file}
      />
      {/* TODO Add a check to check valid magnet link */}
      <Button
        onClick={() => debrid(magnetLink || file)}
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