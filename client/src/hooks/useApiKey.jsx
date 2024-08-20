import { useState } from "react";
import { toast } from "react-hot-toast";
import { checkApiKey, auth, checkPin } from "@api";

const RETRY_DELAY_MS = 2000; // Retry delay in milliseconds

export default function useApiKey(initialKey) {
  const [apiKey, setApiKey] = useState(initialKey);
  const [isValid, setIsValid] = useState(null);

  const updateApiKey = async (key) => {
    setApiKey(key);
    localStorage.setItem("apiKey", key);
    await checkValidity(key);
  };

  const clearApiKey = () => {
    setApiKey("");
    localStorage.removeItem("apiKey");
  };

  const checkValidity = async (key) => {
    try {
      await checkApiKey(key);
      setIsValid(true);
      toast.success("API key is valid");
    } catch (error) {
      setIsValid(false);
      toast.error("API key is invalid");
    }
  };

  const checkForApiKey = async (pin, check) => {
    try {
      const result = await checkPin(pin, check);
      if (result && result.apiKey) {
        await updateApiKey(result.apiKey);
      } else {
        setTimeout(() => checkForApiKey(pin, check), RETRY_DELAY_MS);
      }
    } catch (error) {
      console.error("Error checking for API Key:", error);
      setTimeout(() => checkForApiKey(pin, check), RETRY_DELAY_MS);
    }
  };

  const getApiKey = async () => {
    try {
      const response = await auth();
      window.open(response.url); // Open browser with URL to login
      await checkForApiKey(response.pin, response.check); // Start checking for the apikey
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return {
    apiKey,
    isValid,
    getApiKey,
    updateApiKey,
    clearApiKey,
    checkValidity: () => checkValidity(apiKey),
  };
}