import axios from "axios";

const getMagnetID = async (input, onProgress) => {
  const PrefixUrl = window.RUNTIME_CONFIG.PREFIX_URL;
  const apiKey = localStorage.getItem("apiKey");
  let data;
  let headers = { "api-key": apiKey };

  if (typeof input === "string") {
    // Handle magnet link
    data = { magnetLink: input };
  } else {
    // Handle file
    data = new FormData();
    data.append("torrent", input);
  }

  try {
    const response = await axios.post(
      `${PrefixUrl}/api/debrid/getMagnetID`,
      data,
      {
        headers,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // Optional callback to track progress
          if (onProgress) {
            onProgress(percentCompleted);
          }
        },
      }
    );
    return response.data.id;
  } catch (error) {
    console.error("Error getting magnet ID: ", error);
    throw error;
  }
};

export default getMagnetID;
