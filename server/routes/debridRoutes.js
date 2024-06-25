const express = require('express');
const path = require('path');
const multer = require('multer');
const { createApiEndpoint, apiCall, uploadFile } = require('./apiRequest');
const { BASE_URL, AGENT_NAME } = require('../config');

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  })
});


async function getMagnetId(magnetOrTorrent, apiKey) {
  if (magnetOrTorrent.startsWith('magnet:?')) {
    const response = await apiCall('GET', `${BASE_URL}/magnet/upload?agent=${AGENT_NAME}&apikey=${apiKey}&magnets[]=${encodeURIComponent(magnetOrTorrent)}`);
    return response.data.magnets[0].id;
  } else {
    const response = await uploadFile(magnetOrTorrent, apiKey);
    return response.data.files[0].id;
  }
}

router.post('/getMagnetID', upload.single('torrent'), async (req, res) => {
  try {
    const apiKey = req.headers['api-key'];
    const magnetOrTorrent = req.body.magnetLink || req.file.path;
    const id = await getMagnetId(magnetOrTorrent, apiKey);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process request' });
  }
});

router.post('/getLinksFromMagnet', async (req, res) => {
  const apiKey = req.headers['api-key'];
  const { magnetID } = req.body;
  const apiEndpoint = createApiEndpoint('magnet/status', { apikey: apiKey, id: magnetID });

  try {
    const response = await apiCall('GET', apiEndpoint);
    const links = response.data.magnets.links;
    const statusCode = response.data.magnets.statusCode;
    console.log('Links:', links);
    console.log('Status code:', statusCode);
    res.json({ links, statusCode });
  } catch (error) {
    console.error('Failed to get magnet link status', error);
    res.status(500).json({ error: 'Failed to get magnet link status' });
  }
});

router.post("/debridLinks", async (req, res) => {
  const apiKey = req.headers["api-key"];
  const { links } = req.body;
  
  try {
    const debridedLinks = await Promise.all(links.map(link => {
      const apiEndpoint = createApiEndpoint('link/unlock', { apikey: apiKey, link });
      return apiCall('GET', apiEndpoint).then(response => response.data);
    }));
    res.json({ debridedLinks });
  } catch (error) {
    console.error("Error debriding links:", error);
    res.status(500).json({ error: "Failed to debrid links" });
  }
});

router.post("/saveLinks", async (req, res) => {
  const apiKey = req.headers["api-key"];
  const { links } = req.body;
  const apiEndpoint = createApiEndpoint('user/links/save', {
    apikey: apiKey,
    'links[]': links
  });

  try {
    const response = await apiCall('GET', apiEndpoint, null, {
      validateStatus: false // Handle HTTP status code >= 400
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error saving links:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;