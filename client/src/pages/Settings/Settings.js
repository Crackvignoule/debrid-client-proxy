import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { toast } from 'react-hot-toast';

// Function to check API key
const checkApiKey = (key) => {
  const apiEndpoint = `http://api.alldebrid.com/v4/user?agent=myAppName&apikey=${key}`;

  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    })
    .catch(() => Promise.reject());
};

function Settings() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');

  const handleInputChange = (event) => {
    const key = event.target.value;
    setApiKey(key);

    // Save API key to localStorage
    localStorage.setItem('apiKey', key);

    toast.promise(
      checkApiKey(key),
      {
        loading: 'Checking API key...',
        success: <b>API key is valid</b>,
        error: <b>API key is invalid</b>,
      }
    );
  };

  return (
    <div>
      <h1>Settings</h1>
      <label>
        Alldebrid API Key:
        <Input
        label="API Key"
        placeholder="Enter your API key"
        value={apiKey}
        onChange={handleInputChange}
      />
      </label>
    </div>
  );
}

export default Settings;