import axios from 'axios';

const PrefixUrl = window.RUNTIME_CONFIG.URL_PREFIX;

export const deleteLinks = (links) => {
    const apiKey = localStorage.getItem("apiKey");
    const headers = { "api-key": apiKey };
    return axios.get(`${PrefixUrl}/api/user/deleteLink`, {
      headers,
      params: { link: links },
    });
  };

export const saveLinks = async (links) => {
    const apiKey = localStorage.getItem("apiKey");
    let headers = { "api-key": apiKey };
    // Define the base URL for the API
    const PrefixUrl = window.RUNTIME_CONFIG.URL_PREFIX;
    try {
      await axios.post(
        `${PrefixUrl}/api/debrid/saveLinks`, // Prepend the base URL to the endpoint
        { links },
        { headers }
      );
      console.log("Link saved successfully");
    } catch (error) {
      console.error("Error saving link:", error);
      throw error;
    }
  };

export const fetchLinks = () => {
    const apiKey = localStorage.getItem("apiKey");
    const headers = { "api-key": apiKey };
    return axios.get(`${PrefixUrl}/api/user/getSavedLinks`, { headers });
  };