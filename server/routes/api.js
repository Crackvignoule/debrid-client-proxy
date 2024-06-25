const express = require('express');
const router = express.Router();

const debridRoutes = require('./debridRoutes');
const checkApiKeyRoutes = require('./checkApiKeyRoutes');

router.use('/debrid', debridRoutes);
router.use('/checkApiKey', checkApiKeyRoutes);

module.exports = router;
