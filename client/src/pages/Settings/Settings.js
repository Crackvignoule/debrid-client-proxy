import { useState } from 'react';

function Settings() {
  const [apiKey, setApiKey] = useState('');

  const handleInputChange = (event) => {
    setApiKey(event.target.value);
  };

  return (
    <div>
      <h1>Settings</h1>
      
    </div>
  );
}

export default Settings;