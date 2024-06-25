const express = require('express');
const path = require('path');
const multer = require('multer');
const { createApiEndpoint, apiCall, uploadFile } = require('./apiRequest');
const { BASE_URL, AGENT_NAME } = require('../config');

const router = express.Router();

// Middleware for extracting API key
const extractApiKey = (req, res, next) => {
  req.apiKey = req.headers['api-key'];
  if (!req.apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }
  next();
};

// Middleware for error handling
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Setup for file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
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

router.post('/getMagnetID', extractApiKey, upload.single('torrent'), asyncHandler(async (req, res) => {
  const magnetOrTorrent = req.body.magnetLink || req.file.path;
  const id = await getMagnetId(magnetOrTorrent, req.apiKey);
  res.json({ id });
}));

router.post('/getLinksFromMagnet', extractApiKey, asyncHandler(async (req, res) => {
  const { magnetID } = req.body;
  const apiEndpoint = createApiEndpoint('magnet/status', { apikey: req.apiKey, id: magnetID });
  const response = await apiCall('GET', apiEndpoint);
  res.json({ links: response.data.magnets.links, statusCode: response.data.magnets.statusCode });
}));

router.post("/debridLinks", extractApiKey, asyncHandler(async (req, res) => {
  const { links } = req.body;
  const debridedLinks = await Promise.all(links.map(link => {
    const apiEndpoint = createApiEndpoint('link/unlock', { apikey: req.apiKey, link });
    return apiCall('GET', apiEndpoint).then(response => response.data);
  }));
  res.json({ debridedLinks });
}));

router.post("/saveLinks", extractApiKey, asyncHandler(async (req, res) => {
  const { links } = req.body;
  const apiEndpoint = createApiEndpoint('user/links/save', { apikey: req.apiKey, 'links[]': links });
  const response = await apiCall('GET', apiEndpoint, null, { validateStatus: false });
  res.json(response.data);
}));

module.exports = router;