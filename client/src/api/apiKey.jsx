import axios from "axios";

const PrefixUrl = window.RUNTIME_CONFIG.URL_PREFIX;

export const auth = async () => {
  const response = await axios.get(`${PrefixUrl}/api/user/auth`);
  return response.data;
};

export const checkPin = async (pin, check) => {
  const headers = { "check": check, "pin": pin };
  const response = await axios.get(`${PrefixUrl}/api/user/getApiKey`, { headers });
  return response.data;
};

export const checkApiKey = async (apiKey) => {
  const headers = { "api-key": apiKey };
  const response = await axios.get(`${PrefixUrl}/api/user/checkApiKey`, { headers });
  const res = response.data;
  if (!res.isValid) {
    throw new Error("API key is invalid");
  }
  return res;
};
