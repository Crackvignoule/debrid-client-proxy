import axios from 'axios';

const PrefixUrl = window.RUNTIME_CONFIG.URL_PREFIX;

const fetchLinks = () => {
  const apiKey = localStorage.getItem("apiKey");
  const headers = { "api-key": apiKey };
  return axios.get(`${PrefixUrl}/api/user/getSavedLinks`, { headers });
};

export default fetchLinks;