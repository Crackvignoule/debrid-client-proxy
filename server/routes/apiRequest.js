// Helper function to construct API endpoints
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const querystring = require('querystring');
const { BASE_URL, AGENT_NAME } = require('../config');


// generateResponse 
const generateResponse = async ({ req, res, method = 'GET', endpoint, queryParams = {}, formatResponse }) => {
  const apiEndpoint = createApiEndpoint(endpoint, queryParams);
  const response = await apiCall(method, apiEndpoint);
  return res.json(formatResponse(response));
};

function createApiEndpoint(path, params = {}) {
    const query = querystring.stringify({ ...params, agent: AGENT_NAME }, null, null, {
      encodeURIComponent: str => str // Prevent double encoding
    });
    return `${BASE_URL}/${path}?${query}`;
  }

async function apiCall(method, url, data = null, headers = {}) {
    try {
      const response = await axios({
        method,
        url,
        data,
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(`API call failed: ${error}`);
      throw error;
    }
  }

function deleteFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}:`, err);
        reject(err);
      } else {
        console.log(`Successfully deleted file ${filePath}`);
        resolve();
      }
    });
  });
}

async function uploadFile(filePath, apiKey) {
  if (!fs.existsSync(filePath)) {
    throw new Error('File does not exist');
  }

  const formData = new FormData();
  formData.append('files[0]', fs.createReadStream(filePath));

  const config = {
    headers: formData.getHeaders(),
  };

  try {
    const response = await apiCall('POST', `${BASE_URL}/magnet/upload/file?agent=${AGENT_NAME}&apikey=${apiKey}`, formData, config);
    deleteFile(filePath);
    return response;
  } catch (error) {
    console.error('Failed to upload file', error);
    throw error;
  }
}

module.exports = { generateResponse, createApiEndpoint, apiCall, uploadFile };