const express = require('express');
const { generateResponse } = require('./apiRequest');
const { asyncHandler, extractApiKey } = require('../middleware');

const router = express.Router();

router.get('/auth', asyncHandler(async (req, res) => {
  await generateResponse({
    req,
    res,
    endpoint: "pin/get",
    formatResponse: (response) => ({
      pin: response.data.pin,
      check: response.data.check,
      url: response.data.user_url,
  })});
}));

router.get('/getApiKey', asyncHandler(async (req, res) => {
  const { pin, check } = req.headers;
  await generateResponse({
    req,
    res,
    endpoint:'pin/check',
    queryParams: { pin, check },
    formatResponse: (response) => ({ apiKey: response.data.apikey }),});
}));

router.get('/checkApiKey', extractApiKey, asyncHandler(async (req, res) => {
  await generateResponse({
    req,
    res,
    endpoint: 'user',
    queryParams: { apikey: req.apiKey },
    formatResponse: response => ({
      isValid: response.status === 'success'
    })
  });
}));

router.get('/history', extractApiKey, asyncHandler(async (req, res) => {
  await generateResponse({
    req,
    res,
    endpoint: 'user/history',
    queryParams: { apikey: req.apiKey },
    formatResponse: response => ({ history: response.data.links })
  });
}));

router.get('/getSavedLinks', extractApiKey, asyncHandler(async (req, res) => {
  await generateResponse({
    req,
    res,
    endpoint: 'user/links',
    queryParams: { apikey: req.apiKey },
    formatResponse: response => ({ links: response.data.links })
  });
}));

router.get('/deleteLink', extractApiKey, asyncHandler(async (req, res) => {
  const links = req.query.link ? req.query.link.split(',') : [];
  const queryParams = links.reduce((acc, link, index) => ({ ...acc, [`links[${index}]`]: link }), { apikey: req.apiKey });
  await generateResponse({
    req,
    res,
    endpoint: 'user/links/delete',
    queryParams: queryParams,
    formatResponse: response => ({ success: response.status === 'success' })
  });
}));

module.exports = router;