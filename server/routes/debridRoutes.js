const express = require('express');
// const axios = require('axios');
const router = express.Router();

// TODO Maybe functions shouldnt be here
// TODO magnetortorrent logic different than in input instanceof File or input === 'string'
// const API_KEY = 'your_api_key'; // Replace with your API key
// const agent = 'myAppName'; // Replace with your app name

async function getMagnetId(magnetOrTorrent, apiKey) {
  const agent = 'myAppName'; // Replace with your app name

  // Check if it's a magnet link or a torrent file
  if (magnetOrTorrent.startsWith('magnet:?')) {
    // Handle magnet link
    try {
      const response = await axios.get(`https://api.alldebrid.com/v4/magnet/upload?agent=${agent}&apikey=${apiKey}&magnets[]=${encodeURIComponent(magnetOrTorrent)}`);
      const magnetID = response.data.data.magnets[0].id;
      return magnetID;
    } catch (error) {
      console.error('Failed to upload magnet link', error);
      return null;
    }
  } else {
    // Handle torrent file
    const formData = new FormData();

    // Append the torrent file to the form data
    formData.append('files[0]', fs.createReadStream(magnetOrTorrent));

    // Upload the torrent file
    try {
      const uploadResponse = await axios.post(`https://api.alldebrid.com/v4/magnet/upload/file?agent=${agent}&apikey=${apiKey}`, formData, {
        headers: formData.getHeaders(),
      });

      // Get the magnet ID
      const magnetID = uploadResponse.data.data.files[0].id;
      return magnetID;
    } catch (error) {
      console.error('Failed to upload torrent file', error);
      return null;
    }
  }
}

router.post('/api/getMagnetID', async (req, res) => {
  const { magnetOrTorrent } = req.body;
  const apiKey = req.headers['x-api-key']; // Replace 'x-api-key' with the name of the header field that will contain the API key

  if (magnetOrTorrent) {
    try {
      const id = await getMagnetId(magnetOrTorrent, apiKey);
      res.json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload magnet link or torrent file' });
    }
  } else {
    res.status(400).json({ error: 'No magnet link or torrent file provided' });
  }
});

module.exports = router;