// TODO Make API call match AD API paths like /user/history
const express = require('express');
const { createApiEndpoint, apiCall } = require('./apiRequest');
const { asyncHandler, extractApiKey } = require('../middleware');

const router = express.Router();

router.get('/auth', extractApiKey, asyncHandler(async (req, res) => {
  // GET https://api.alldebrid.com/v4/pin/get?agent=myAppName
  const apiEndpoint = createApiEndpoint('pin/get', { apikey: req.apiKey });
  const response = await apiCall('GET', apiEndpoint);
  res.json({ pin: response.data.pin, expires_in: response.data.expires_in });
}
));

router.get('/checkApiKey', extractApiKey, asyncHandler(async (req, res) => {
  const apiEndpoint = createApiEndpoint('user', { apikey: req.apiKey });
  const response = await apiCall('GET', apiEndpoint);

  if (response.status === 'success') {
      res.json({ isValid: true });
  } else {
      res.json({ isValid: false });
  }
}));

router.get('/history', extractApiKey, asyncHandler(async (req, res) => {
  // GET https://api.alldebrid.com/user/history?agent=myAppName&apikey=someValidApikeyYouGenerated
  const apiEndpoint = createApiEndpoint('user/history', { apikey: req.apiKey });
  const response = await apiCall('GET', apiEndpoint);
  res.json({ history: response.data.links });
}));

router.get('/getSavedLinks', extractApiKey, asyncHandler(async (req, res) => {
    const apiEndpoint = createApiEndpoint('user/links', { apikey: req.apiKey });
    const response = await apiCall('GET', apiEndpoint);
    res.json({ links: response.data.links });
}));

router.get('/deleteLink', extractApiKey, asyncHandler(async (req, res) => {
    // TODO: revert back to no single deletition
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
