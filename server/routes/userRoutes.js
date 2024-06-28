const express = require('express');
const { generateResponse } = require('./apiRequest');
const { asyncHandler, extractApiKey } = require('../middleware');

const router = express.Router();

router.get('/auth', asyncHandler(async (req, res) => {
  await generateResponse(req, res, 'pin/get', response => ({
    pin: response.data.pin,
    check: response.data.check,
    url: response.data.user_url
  }));
}));

router.get('/getApiKey', asyncHandler(async (req, res) => {
  const { pin, check } = req.headers;
  await generateResponse(req, res, 'pin/check', response => ({ apiKey: response.data.apikey }), 'GET', { pin, check });
}));

router.get('/checkApiKey', extractApiKey, asyncHandler(async (req, res) => {
  await generateResponse(req, res, 'user', response => ({
    isValid: response.status === 'success'
  }), 'GET', { apikey: req.apiKey });
}));

router.get('/history', extractApiKey, asyncHandler(async (req, res) => {
  await generateResponse(req, res, 'user/history', response => ({ history: response.data.links }), 'GET', { apikey: req.apiKey });
}));

router.get('/getSavedLinks', extractApiKey, asyncHandler(async (req, res) => {
  await generateResponse(req, res, 'user/links', response => ({ links: response.data.links }), 'GET', { apikey: req.apiKey });
}));

router.get('/deleteLink', extractApiKey, asyncHandler(async (req, res) => {
  const links = req.query.link ? req.query.link.split(',') : [];
  const queryParams = links.reduce((acc, link, index) => ({ ...acc, [`links[${index}]`]: link }), { apikey: req.apiKey });
  await generateResponse(req, res, 'user/links/delete', response => ({ success: response.status === 'success' }), 'GET', queryParams);
}));

module.exports = router;