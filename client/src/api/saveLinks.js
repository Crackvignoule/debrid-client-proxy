import axios from 'axios';

const saveLinks = async (links) => {
    const apiKey = localStorage.getItem("apiKey");
    let headers = { 'api-key': apiKey };
    try {
      await axios.post(
        "/api/debrid/saveLinks",
        { links },
        { headers }
      );
      console.log("Link saved successfully");
    } catch (error) {
      console.error("Error saving link:", error);
      throw error;
    }
}

export default saveLinks;