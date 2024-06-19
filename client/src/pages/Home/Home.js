import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FileUpload } from "../../components";
import { useUpload } from "../../hooks/useUpload";
// TODO use redux ?

function Home() {
  const [file, setFile] = useState();
  const { magnetLink, setMagnetLink, upload } = useUpload();

// TODO toaster if user is clicking on disabled input
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page.</p>
      <FileUpload file={file} setFile={setFile} disabled={!!magnetLink}/>

      <Input
        variant="faded"
        // key={apiKey}
        isClearable
        label="Magnet Link"
        onChange={(e) => setMagnetLink(e.target.value)}
        disabled={!!file}
        // isInvalid={isValid === false}
        // value={apiKey}
        // onChange={updateApiKey}
        // onClear={clearApiKey}
        // className="input-field"
      />

      <Button
        onClick={() => upload(magnetLink || file)}
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        Debrid
      </Button>
    </div>
  );
}

export default Home;
