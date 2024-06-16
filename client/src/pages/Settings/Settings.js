import { useState } from 'react';
import { Input } from '@nextui-org/react';

function Settings() {
  const [apiKey, setApiKey] = useState('');

  const handleInputChange = (event) => {
    setApiKey(event.target.value);
  };

  return (
    <div>
      <h1>Settings</h1>
      {/* input for api key */}
      <Input
        label="API Key"
        placeholder="Enter your API key"
        value={apiKey}
        onChange={handleInputChange}
      />
      
    </div>
  );
}

export default Settings;