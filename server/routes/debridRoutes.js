const express = require('express');
const router = express.Router();
const axios = require('axios');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

// TODO Maybe functions shouldnt be here
// TODO Get rid of some console.logs
// TODO Global agent and apikey ?
// TODO magnetortorrent logic different than in input instanceof File or input === 'string'
// TODO Add support for multiple torrent / magnets debrid
// TODO Use status live from api to track magnet progress on alldebrid side

async function getMagnetId(magnetOrTorrent, apiKey) {
  const agent = 'myAppName'; // Replace with your app name

  // Check if it's a magnet link or a torrent file
  if (magnetOrTorrent.startsWith('magnet:?')) {
    // Handle magnet link
    try {
      const response = await axios.get(`https://api.alldebrid.com/v4/magnet/upload?agent=${agent}&apikey=${apiKey}&magnets[]=${encodeURIComponent(magnetOrTorrent)}`);
      const magnetID = response.data.data.magnets[0].id;
      return magnetID;
    } catch (error) {
      console.error('Failed to upload magnet link', error);
      return null;
    }
  } else {
    // TODO move imports to the top ?
    // Handle torrent file
    const fs = require('fs'); // Import the file system module
    const FormData = require('form-data'); // Import the form data module
    const formData = new FormData();

    // Append the torrent file to the form data
    formData.append('files[0]', fs.createReadStream(magnetOrTorrent));
    
    // Upload the torrent file
    try {
      const uploadResponse = await axios.post(`https://api.alldebrid.com/v4/magnet/upload/file?agent=${agent}&apikey=${apiKey}`, formData, {
        headers: formData.getHeaders(),
      });
      // Get the magnet ID
      const magnetID = uploadResponse.data.data.files[0].id;
      return magnetID;
    } catch (error) {
      console.error('Failed to upload torrent file', error);
      return null;
    }
  }
}

router.post('/getMagnetID', upload.single('torrent'), async (req, res) => {
  const apiKey = req.headers['api-key'];
  const { magnetLink } = req.body;
  const file = req.file;
  
  if (magnetLink || file) {
    try {
      console.log('Received magnet link or torrent file:', magnetLink || file.path);
      const id = await getMagnetId(magnetLink || file.path, apiKey);
      res.json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload magnet link or torrent file' });
    }
  } else {
    res.status(400).json({ error: 'No magnet link or torrent file provided' });
  }
});

router.post('/getLinksFromMagnet', async (req, res) => {
  const apiKey = req.headers['api-key'];
  const { magnetID } = req.body;
  const agent = 'myAppName'; // Replace with your app name
  const apiEndpoint = `https://api.alldebrid.com/v4/magnet/status?agent=${agent}&apikey=${apiKey}&id=${encodeURIComponent(magnetID)}`;

  try {
    const response = await axios.get(apiEndpoint);
    console.log('Magnet status:', response.data);
    const links = response.data.data.magnets.links;
    res.json({ links });
  } catch (error) {
    console.error('Failed to get magnet link status', error);
    res.status(500).json({ error: 'Failed to get magnet link status' });
  }
});

router.post("/debridLinks", async (req, res) => {
  const apiKey = req.headers["api-key"];
  const { links } = req.body;
  const agent = "myAppName";
  
  // PHP: $apiEndpoint = "https://api.alldebrid.com/v4/link/unlock?agent=myAppName&apikey=someValidApikeyYouGenerated&link=" . urlencode($link);
  const apiEndpoint = `https://api.alldebrid.com/v4/link/unlock?agent=${agent}&apikey=${apiKey}`;

  try {
    const debridedLinks = await Promise.all(links.map(async link => {
      const response = await axios.get(`${apiEndpoint}&link=${encodeURIComponent(link)}`);
      return response.data;
    }));
    res.json({ debridedLinks });
  }
  catch (error) {
    console.error("Error debriding links:", error);
    res.status(500).json({ error: "Failed to debrid links" });
  }
}
);

module.exports = router;