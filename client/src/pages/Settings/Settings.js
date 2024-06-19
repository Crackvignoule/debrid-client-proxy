import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useApiKey } from "../../hooks";
import { CheckValidityButton } from "../../components";
import "./Settings.scss";

function Settings() {
  const initialKey = localStorage.getItem("apiKey") || "";
  const { apiKey, isValid, updateApiKey, clearApiKey, CheckValidity } =
    useApiKey(initialKey);

  return (
    <div className="input-container">
      {/* <h1>Settings</h1> */}
      {/* TODO Remove duplicate css class */}

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
          className="input-field"
        />
      </div>
      <Button
        onClick={CheckValidity}
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        Check validity
      </Button>
    </div>
  );
}

export default Settings;
