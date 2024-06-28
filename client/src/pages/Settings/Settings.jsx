import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useApiKey } from "../../hooks";
import { version } from "../../../package.json";
import "./Settings.scss";

function Settings() {
  const initialKey = localStorage.getItem("apiKey") || "";
  const { apiKey, isValid, updateApiKey, clearApiKey, checkValidity, getApiKey } =
    useApiKey(initialKey);

  return (
    <>
      <div className="input-container">
        <div className="textarea">
          <Input
            variant="faded"
            isClearable
            label="Alldebrid API Key"
            isInvalid={isValid === false}
            value={apiKey}
            onChange={(event) => updateApiKey(event.target.value)}
            onClear={clearApiKey}
            className="input-field text-rich-black"
          />
        </div>
        <Button
          onClick={() => {
            getApiKey();
          }}
          variant="light"
          size="sm"
          radius="md"
          className="text-cadet-grey"
        >
          Get My API Key
        </Button>
        <Button
          onClick={checkValidity}
          radius="full"
          className="bg-gradient-to-tr from-indigo-500 from-10% via-cerulean via-50% to-turquoise to-90%"
        >
          Check validity
        </Button>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex justify-center pb-4">
        <Button
          onClick={() =>
            window.open(
              "https://hub.docker.com/repository/docker/kipavy/debridclientproxy/"
            )
          }
          variant="light"
          size="sm"
          radius="md"
          className="text-cadet-grey"
        >
          v{version}
        </Button>
      </div>
    </>
  );
}

export default Settings;
