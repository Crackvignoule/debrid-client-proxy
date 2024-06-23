import axios from "axios";

const PrefixUrl = window.RUNTIME_CONFIG.URL_PREFIX;

const checkApiKey = async (key) => {
  try {
    const response = await axios.get(`${PrefixUrl}/api/checkApiKey/${key}`);
    const res = response.data;
    if (!res.isValid) {
      throw new Error("API key is invalid");
    }
    return res;
  } catch (error) {
    throw error;
  }
};

export default checkApiKey;
