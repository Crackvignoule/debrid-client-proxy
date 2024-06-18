const express = require('express');
const router = express.Router();

const checkApiKeyRoutes = require('./checkApiKeyRoutes');
const uploadRoutes = require('./uploadRoutes');
const debridLinksRoutes = require('./debridLinksRoutes');
const debridMagnetRoutes = require('./debridMagnetRoutes');
const debridTorrentRoutes = require('./debridTorrentRoutes');

router.use('/checkApiKey', checkApiKeyRoutes);
router.use('/upload', uploadRoutes);
// router.use('/debridLinks', debridLinksRoutes);
// router.use('/debridMagnet', debridMagnetRoutes);
// router.use('/debridTorrent', debridTorrentRoutes);

module.exports = router;