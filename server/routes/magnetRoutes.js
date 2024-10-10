const express = require("express");
const { generateResponse } = require("./apiRequest");
const { asyncHandler, extractApiKey } = require("../middleware");

const router = express.Router();

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Get the status of a magnet session
 *     parameters:
 *       - in: query
 *         name: session
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID
 *       - in: query
 *         name: counter
 *         schema:
 *           type: integer
 *         required: true
 *         description: The counter value
 *     responses:
 *       200:
 *         description: Status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/status', extractApiKey, asyncHandler(async (req, res) => {
    const { session, counter } = req.query;
    const apiKey = req.apiKey;

    const queryParams = {
        apikey: apiKey,
        session: session,
        counter: counter
    };

    await generateResponse({
        req,
        res,
        method: 'GET',
        endpoint: 'magnet/status',
        queryParams: queryParams,
        formatResponse: (response) => response.data
    });
}));

module.exports = router;