import { Input } from "@nextui-org/react";
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

      <CheckValidityButton handleCheckValidity={CheckValidity} />
    </div>
  );
}

export default Settings;
