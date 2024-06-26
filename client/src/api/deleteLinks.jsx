import axios from 'axios';

const PrefixUrl = window.RUNTIME_CONFIG.URL_PREFIX;

const deleteLinks = (links) => {
  const apiKey = localStorage.getItem("apiKey");
  const headers = { "api-key": apiKey };
  return axios.get(`${PrefixUrl}/api/user/deleteLink`, {
    headers,
    params: { link: links },
  });
};

export default deleteLinks;