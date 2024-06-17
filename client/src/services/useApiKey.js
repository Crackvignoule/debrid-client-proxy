import { useState } from 'react';
import { toast } from 'react-hot-toast';
import checkApiKey from './checkApiKey';

export default function useApiKey(initialKey) {
  const [apiKey, setApiKey] = useState(initialKey);
  const [isValid, setIsValid] = useState(null);

  const checkValidity = (key) => {
    toast.promise(checkApiKey(key), {
      loading: "Checking API key...",
      success: () => {
        setIsValid(true);
        return <b>API key is valid</b>;
      },
      error: () => {
        setIsValid(false);
        return <b>API key is invalid</b>;
      },
    });
  };

  const updateApiKey = (event) => {
    const key = event.target.value;
    setApiKey(key);
    localStorage.setItem("apiKey", key);
    checkValidity(key);
  };

  const clearApiKey = () => {
    setApiKey("");
  };

  const CheckValidity = () => {
    checkValidity(apiKey);
  };

  return {
    apiKey,
    isValid,
    updateApiKey,
    clearApiKey,
    CheckValidity,
  };
}