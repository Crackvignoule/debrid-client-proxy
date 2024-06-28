const express = require("express");
const { generateResponse } = require("./apiRequest");
const { asyncHandler, extractApiKey } = require("../middleware");

const router = express.Router();

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