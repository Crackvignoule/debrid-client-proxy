import axios from "axios";

const saveLinks = async (links) => {
  const apiKey = localStorage.getItem("apiKey");
  let headers = { "api-key": apiKey };
  // Define the base URL for the API
  const PrefixUrl = window.RUNTIME_CONFIG.PREFIX_URL;
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

export default saveLinks;
