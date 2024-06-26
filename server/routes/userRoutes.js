const express = require('express');
const { createApiEndpoint, apiCall } = require('./apiRequest');
const { asyncHandler, extractApiKey } = require('../middleware');

const router = express.Router();

router.get('/getSavedLinks', extractApiKey, asyncHandler(async (req, res) => {
    const apiEndpoint = createApiEndpoint('user/links', { apikey: req.apiKey });
    const response = await apiCall('GET', apiEndpoint);
    res.json({ links: response.data.links });
}));

module.exports = router;