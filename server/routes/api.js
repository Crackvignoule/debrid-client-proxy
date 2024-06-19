const express = require('express');
const router = express.Router();

const debridRoutes = require('./debridRoutes');
const checkApiKeyRoutes = require('./checkApiKeyRoutes');
// const uploadRoutes = require('./uploadRoutes');
// const debridLinksRoutes = require('./debridLinksRoutes');
// const debridMagnetRoutes = require('./debridMagnetRoutes');
// const debridTorrentRoutes = require('./debridTorrentRoutes');

router.use('/debrid', debridRoutes);
router.use('/checkApiKey', checkApiKeyRoutes);
// router.use('/debridLinks', debridLinksRoutes);
// router.use('/debridMagnet', debridMagnetRoutes);
// router.use('/debridTorrent', debridTorrentRoutes);

module.exports = router;