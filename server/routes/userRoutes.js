const express = require('express');
const { generateResponse } = require('./apiRequest');
const { asyncHandler, extractApiKey } = require('../middleware');

const router = express.Router();

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Get authentication pin and URL
 *     responses:
 *       200:
 *         description: Authentication pin and URL retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pin:
 *                   type: string
 *                 check:
 *                   type: string
 *                 url:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /getApiKey:
 *   get:
 *     summary: Get API key using pin and check
 *     parameters:
 *       - in: header
 *         name: pin
 *         schema:
 *           type: string
 *         required: true
 *         description: The pin received during authentication
 *       - in: header
 *         name: check
 *         schema:
 *           type: string
 *         required: true
 *         description: The check value received during authentication
 *     responses:
 *       200:
 *         description: API key retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiKey:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/getApiKey', asyncHandler(async (req, res) => {
  const { pin, check } = req.headers;
  await generateResponse({
    req,
    res,
    endpoint:'pin/check',
    queryParams: { pin, check },
    formatResponse: (response) => ({ apiKey: response.data.apikey }),});
}));

/**
 * @swagger
 * /checkApiKey:
 *   get:
 *     summary: Check if the API key is valid
 *     responses:
 *       200:
 *         description: API key validation status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isValid:
 *                   type: boolean
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Get user history
 *     responses:
 *       200:
 *         description: User history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 history:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/history', extractApiKey, asyncHandler(async (req, res) => {
  await generateResponse({
    req,
    res,
    endpoint: 'user/history',
    queryParams: { apikey: req.apiKey },
    formatResponse: response => ({ history: response.data.links.reverse() })
  });
}));

/**
 * @swagger
 * /getSavedLinks:
 *   get:
 *     summary: Get saved links
 *     responses:
 *       200:
 *         description: Saved links retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 links:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/getSavedLinks', extractApiKey, asyncHandler(async (req, res) => {
  await generateResponse({
    req,
    res,
    endpoint: 'user/links',
    queryParams: { apikey: req.apiKey },
    formatResponse: response => ({ links: response.data.links })
  });
}));

/**
 * @swagger
 * /deleteLink:
 *   get:
 *     summary: Delete saved links
 *     parameters:
 *       - in: query
 *         name: link
 *         schema:
 *           type: string
 *         required: true
 *         description: Comma-separated list of links to delete
 *     responses:
 *       200:
 *         description: Links deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /deleteMagnet:
 *   get:
 *     summary: Delete a magnet link
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the magnet link to delete
 *     responses:
 *       200:
 *         description: Magnet link deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/deleteMagnet', extractApiKey, asyncHandler(async (req, res) => {
  await generateResponse({
    req,
    res,
    endpoint: 'magnet/delete',
    queryParams: { apikey: req.apiKey, id: req.query.id },
    formatResponse: response => ({ success: response.status === 'success' })
  });
}));

module.exports = router;