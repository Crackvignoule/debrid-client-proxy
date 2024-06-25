// TODO Maybe functions shouldnt be here
// TODO Global agent and apikey ?
const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');
const path = require('path');
const fs = require('fs'); // Import the file system module
const FormData = require('form-data'); // Import the form data module
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
// TODO update readme and docker hub readme
const BASE_URL = process.env.ALLDEBRID_BASE_URL || 'https://api.alldebrid.com/v4';
const AGENT_NAME = process.env.AGENT_NAME || 'myAppName';


async function getMagnetId(magnetOrTorrent, apiKey) {
  // Check if it's a magnet link or a torrent file
  if (magnetOrTorrent.startsWith('magnet:?')) {
    // Handle magnet link as before
  } else {
    // Handle torrent file
    if (!fs.existsSync(magnetOrTorrent)) {
      throw new Error('File does not exist');
    }

    const formData = new FormData();
    formData.append('files[0]', fs.createReadStream(magnetOrTorrent));
    
    try {
      const uploadResponse = await axios.post(`${BASE_URL}/magnet/upload/file?agent=${AGENT_NAME}&apikey=${apiKey}`, formData, {
        headers: formData.getHeaders(),
      });
      const magnetID = uploadResponse.data.data.files[0].id;

      // Cleanup: Delete the file after use
      fs.unlink(magnetOrTorrent, (err) => {
        if (err) {
          console.error(`Error deleting file ${magnetOrTorrent}:`, err);
        } else {
          console.log(`Successfully deleted file ${magnetOrTorrent}`);
        }
      });

      return magnetID;
    } catch (error) {
      console.error('Failed to upload torrent file', error);
      return null;
    }
  }
}

router.post('/getMagnetID', upload.single('torrent'), async (req, res) => {
  const apiKey = req.headers['api-key'];
  const { magnetLink } = req.body;
  const file = req.file;
  
  if (magnetLink || file) {
    try {
      // console.log('Received magnet link or torrent file:', magnetLink || file.path);
      const id = await getMagnetId(magnetLink || file.path, apiKey);
      res.json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload magnet link or torrent file' });
    }
  } else {
    res.status(400).json({ error: 'No magnet link or torrent file provided' });
  }
});

router.post('/getLinksFromMagnet', async (req, res) => {
  const apiKey = req.headers['api-key'];
  const { magnetID } = req.body;
  const apiEndpoint = `${BASE_URL}/magnet/status?agent=${AGENT_NAME}&apikey=${apiKey}&id=${encodeURIComponent(magnetID)}`;

  try {
    const response = await axios.get(apiEndpoint);
    // console.log('Magnet status:', response.data);
    const links = response.data.data.magnets.links;
    const statusCode = response.data.data.magnets.statusCode
    res.json({ links, statusCode });
  } catch (error) {
    console.error('Failed to get magnet link status', error);
    res.status(500).json({ error: 'Failed to get magnet link status' });
  }
});

router.post("/debridLinks", async (req, res) => {
  const apiKey = req.headers["api-key"];
  const { links } = req.body;
  
  const apiEndpoint = `${BASE_URL}/link/unlock?agent=${AGENT_NAME}&apikey=${apiKey}`;

  try {
    const debridedLinks = await Promise.all(links.map(async link => {
      const response = await axios.get(`${apiEndpoint}&link=${encodeURIComponent(link)}`);
      return response.data;
    }));
    res.json({ debridedLinks });
  }
  catch (error) {
    console.error("Error debriding links:", error);
    res.status(500).json({ error: "Failed to debrid links" });
  }
});

router.post("/saveLinks", async (req, res) => {
  const apiKey = req.headers["api-key"];
  const { links } = req.body;
  const apiEndpoint = `${BASE_URL}/user/links/save`;

  try {
    // Construct query parameters
    const queryParams = querystring.stringify({
      AGENT_NAME,
      apikey: apiKey,
      'links[]': links.map(link => encodeURIComponent(link)),
    }, null, null, {
      encodeURIComponent: str => str // Prevent double encoding
    });

    // Make the request to the external API
    const response = await axios.get(`${apiEndpoint}?${queryParams}`, {
      validateStatus: false // To handle HTTP status code >= 400 similarly to PHP's 'ignore_errors' => true
    });

    // Assuming the response is JSON and you want to forward it to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error saving links:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;