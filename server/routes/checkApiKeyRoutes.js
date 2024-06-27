const express = require('express');
const router = express.Router();
const { BASE_URL, AGENT_NAME } = require('../config');

router.get('/:key', async (req, res) => {
    const API_KEY = req.params.key;
    const apiEndpoint = `${BASE_URL}/user?agent=${AGENT_NAME}&apikey=${API_KEY}`;
  
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
  
      if (data.status === 'success') {
        res.json({ isValid: true });
      } else {
        res.json({ isValid: false });
      }
    } catch (error) {
      res.json({ isValid: false });
    }
});

module.exports = router;
