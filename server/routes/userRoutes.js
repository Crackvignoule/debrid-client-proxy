const express = require('express');
const { createApiEndpoint, apiCall } = require('./apiRequest');
const { asyncHandler, extractApiKey } = require('../middleware');

const router = express.Router();

router.get('/getSavedLinks', extractApiKey, asyncHandler(async (req, res) => {
    const apiEndpoint = createApiEndpoint('user/links', { apikey: req.apiKey });
    const response = await apiCall('GET', apiEndpoint);
    res.json({ links: response.data.links });
}));

router.get('/deleteLink', extractApiKey, asyncHandler(async (req, res) => {
    // Assuming link is provided as a comma-separated list (e.g., link=LINK1,LINK2)
    const links = req.query.link ? req.query.link.split(',') : [];
    const queryParams = {
        apikey: req.apiKey,
        // Spread the links array into the query parameters
        ...links.reduce((acc, link, index) => ({ ...acc, [`links[${index}]`]: link }), {})
    };
    const apiEndpoint = createApiEndpoint('user/links/delete', queryParams);
    const response = await apiCall('GET', apiEndpoint);
    res.json({ message: response });
}));

module.exports = router;