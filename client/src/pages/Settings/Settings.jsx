import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useApiKey } from "../../hooks";
import { version } from '../../../package.json';
import "./Settings.scss";

function Settings() {
  const initialKey = localStorage.getItem("apiKey") || "";
  const { apiKey, isValid, updateApiKey, clearApiKey, CheckValidity } =
    useApiKey(initialKey);

  return (
    <>
      <div className="input-container">
        {/* <h1>Settings</h1> */}
        {/* TODO Remove duplicate css class */}
        {/* TODO Add button redirect "Get My API Key" */}
        {/* TODO Add support for pin auth, login alldebrid button to get automatically (temp?) api key after user login */}

        <div className="input-container">
          <Input
            variant="faded"
            key={apiKey}
            isClearable
            label="Alldebrid API Key"
            isInvalid={isValid === false}
            value={apiKey}
            onChange={updateApiKey}
            onClear={clearApiKey}
            className="input-field text-rich-black"
          />
        </div>
        <Button
          onClick={CheckValidity}
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
