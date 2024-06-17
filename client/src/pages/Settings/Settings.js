import { useApiKey } from '../../services';
import { InputField, CheckValidityButton } from '../../components';
import './Settings.scss';

function Settings() {
  const initialKey = localStorage.getItem("apiKey") || "";
  const {
    apiKey,
    isValid,
    updateApiKey,
    clearApiKey,
    CheckValidity,
  } = useApiKey(initialKey);

  return (
    <div>
      {/* <h1>Settings</h1> */}
      <InputField
        isInvalid={isValid}
        apiKey={apiKey}
        handleInputChange={updateApiKey}
        handleClearInput={clearApiKey}
      />
      <CheckValidityButton handleCheckValidity={CheckValidity} />
    </div>
  );
}

export default Settings;