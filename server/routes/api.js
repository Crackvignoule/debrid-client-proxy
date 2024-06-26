const express = require('express');
const router = express.Router();

const debridRoutes = require('./debridRoutes');
const checkApiKeyRoutes = require('./checkApiKeyRoutes');
const userRoutes = require('./userRoutes');

router.use('/debrid', debridRoutes);
router.use('/checkApiKey', checkApiKeyRoutes);
router.use('/user', userRoutes);

module.exports = router;
