const express = require('express');
const router = express.Router();

const agent = "myAppName";

router.get('/:key', async (req, res) => {
    const API_KEY = req.params.key;
    const apiEndpoint = `http://api.alldebrid.com/v4/user?agent=${agent}&apikey=${API_KEY}`;
  
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