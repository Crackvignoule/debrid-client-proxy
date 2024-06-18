const express = require('express');
const router = express.Router();

router.get('/checkApiKey/:key', async (req, res) => {
  const key = req.params.key;
  const apiEndpoint = `http://api.alldebrid.com/v4/user?agent=myAppName&apikey=${key}`;

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