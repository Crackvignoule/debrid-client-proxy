import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FileUpload } from "../../components";
import { useUpload, useDebrid } from "../../hooks";

function Home() {
  const [file, setFile] = useState();
  const { magnetLink, setMagnetLink, upload } = useUpload();
  const { debrid, debridResult } = useDebrid();

  // TODO FIRST: Button launch debrid() wether its a file or a magnet link, then debrid() will use /api/getMagnetID and /api/debridMagnet and setDebridResult

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

      {/* TODO Move this in a component maybe */}
      {debridResult && (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Filename</th>
              <th>Debrided Link</th>
            </tr>
          </thead>
          <tbody>
            {debridResult.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.filename}</td>
                <td>
                  <a href={item.debridedLink.data.link}>
                    {item.debridedLink.data.link}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;