const express = require('express');
const path = require('path');
const multer = require('multer');
const { asyncHandler, extractApiKey } = require('../middleware');
const { createApiEndpoint, apiCall, uploadFile } = require('./apiRequest');
const { BASE_URL, AGENT_NAME } = require('../config');

const router = express.Router();

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

/**
 * @swagger
 * /getMagnetID:
 *   post:
 *     summary: Get Magnet ID from magnet link or torrent file
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: magnetLink
 *         type: string
 *         description: Magnet link
 *       - in: formData
 *         name: torrent
 *         type: file
 *         description: Torrent file
 *     responses:
 *       200:
 *         description: Magnet ID retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post('/getMagnetID', extractApiKey, upload.single('torrent'), asyncHandler(async (req, res) => {
  const magnetOrTorrent = req.body.magnetLink || req.file.path;
  const id = await getMagnetId(magnetOrTorrent, req.apiKey);
  res.json({ id });
}));

/**
 * @swagger
 * /getLinksFromMagnet:
 *   post:
 *     summary: Get links from Magnet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               magnetID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Links retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 links:
 *                   type: array
 *                   items:
 *                     type: string
 *                 statusCode:
 *                   type: integer
 *       400:
 *         description: Bad request
 */
// const extractLinks = (nodes) => {
//   let links = [];

//   nodes.forEach(node => {
//     if (node.e) {
//       // If the node has sub-nodes, recursively extract links from them
//       links = links.concat(extractLinks(node.e));
//     } else if (node.l) {
//       // If the node is a file, add its link to the list
//       links.push(node.l);
//     }
//   });

//   return links;
// };

router.post('/getLinksFromMagnet', extractApiKey, asyncHandler(async (req, res) => {
  const { magnetID } = req.body;
  const apiEndpoint = createApiEndpoint('magnet/status', { apikey: req.apiKey, id: magnetID });
  const response = await apiCall('GET', apiEndpoint);
  const links = response.data.magnets.links;
  res.json({ links: links, statusCode: response.data.magnets.statusCode });
}));

/**
 * @swagger
 * /debridLinks:
 *   post:
 *     summary: Debrid multiple links
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               links:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Links debrided successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 debridedLinks:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad request
 */
router.post("/debridLinks", extractApiKey, asyncHandler(async (req, res) => {
  const { links } = req.body;
  const debridedLinks = [];

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  for (const link of links) {
    const apiEndpoint = createApiEndpoint('link/unlock', { apikey: req.apiKey, link });
    const response = await apiCall('GET', apiEndpoint);
    debridedLinks.push(response.data);
    await delay(100);
  }

  res.json({ debridedLinks });
}));

/**
 * @swagger
 * /debridLink:
 *   post:
 *     summary: Debrid a single link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Link debrided successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.post("/debridLink", extractApiKey, asyncHandler(async (req, res) => {
  const { link } = req.body;
  const apiEndpoint = createApiEndpoint('link/unlock', { apikey: req.apiKey, link });
  const response = await apiCall('GET', apiEndpoint);
  res.json(response.data);
}));

/**
 * @swagger
 * /saveLinks:
 *   post:
 *     summary: Save multiple links
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               links:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Links were sucessfully saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.post("/saveLinks", extractApiKey, asyncHandler(async (req, res) => {
  const { links } = req.body;
  const apiEndpoint = createApiEndpoint('user/links/save', { apikey: req.apiKey, 'links[]': links });
  const response = await apiCall('GET', apiEndpoint, null, { validateStatus: false });
  res.json(response.data);
}));

module.exports = router;