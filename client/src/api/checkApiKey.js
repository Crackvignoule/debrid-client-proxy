import axios from 'axios';

const checkApiKey = async (key) => {
  try {
    const response = await axios.get(`/api/checkApiKey/${key}`);
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