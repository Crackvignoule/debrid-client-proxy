const express = require('express');
// const axios = require('axios');
const router = express.Router();

// const API_KEY = 'your_api_key'; // Replace with your API key
// const agent = 'myAppName'; // Replace with your app name

router.post('/api/debrid', async (req, res) => {
    const { magnet, torrent } = req.body;
  
    if (magnet) {
      // Handle magnet link
      try {
        const magnetID = await getMagnetId(magnet);
        res.json({ magnetID });
      } catch (error) {
        res.status(500).json({ error: 'Failed to upload magnet link' });
      }
    } else if (torrent) {
      // Handle torrent file
      try {
        const torrentID = await getTorrentId(torrent); // You'll need to implement getTorrentId
        res.json({ torrentID });
      } catch (error) {
        res.status(500).json({ error: 'Failed to upload torrent file' });
      }
    } else {
      res.status(400).json({ error: 'No magnet link or torrent file provided' });
    }
  });

module.exports = router;