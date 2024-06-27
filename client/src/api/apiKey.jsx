import axios from "axios";

const PrefixUrl = window.RUNTIME_CONFIG.URL_PREFIX;

export const checkApiKey = async (apiKey) => {
  const headers = { "api-key": apiKey };
  const response = await axios.get(`${PrefixUrl}/api/user/checkApiKey`, { headers });
  const res = response.data;
  if (!res.isValid) {
    throw new Error("API key is invalid");
  }
  return res;
};
