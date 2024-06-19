// PHP
// function debrid_magnet($magnet) {
// 	global $API_KEY;
// 	global $counter;
// 	$context = stream_context_create([ 'http' => [ 'ignore_errors' => true ] ]); // Suppress PHP warnings on HTTP status code >= 400
// 	// Authentificated endpoint with valid apikey
// 	$apiEndpoint = "https://api.alldebrid.com/v4/magnet/upload?agent=myAppName&apikey=$API_KEY&magnets[]=" . urlencode($magnet);
// 	$response = json_decode(file_get_contents($apiEndpoint, false, $context));
// 	$magnetID = $response->data->magnets[0]->id;

//         // Authentificated endpoint with valid apikey
//         $context = stream_context_create([ 'http' => [ 'ignore_errors' => true ] ]); // Suppress PHP warnings on HTTP status code >= 400
//         $apiEndpoint = "https://api.alldebrid.com/v4/magnet/status?agent=myAppName&apikey=$API_KEY";
//         $apiEndpointOnlyOne = "https://api.alldebrid.com/v4/magnet/status?agent=myAppName&apikey=$API_KEY&id=" . urlencode($magnetID);
//         $apiEndpointOnlyActive = "https://api.alldebrid.com/v4/magnet/status?agent=myAppName&apikey=$API_KEY&status=active";

//         $response = json_decode(file_get_contents($apiEndpointOnlyOne, false, $context));
//         foreach ($response->data->magnets->links as $linkObj) {
//         // echo $linkObj->link . "\n";
//         $link=$linkObj->link;
//         $counter++;
//         debrid_links([$link]);
// }}

// reuse debrid links  afterwards

// functions to code:
// get_magnet_id
// debrid_magnet_id

const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = 'your_api_key'; // Replace with your API key
const agent = 'myAppName'; // Replace with your app name

// Function to get magnet ID from a magnet link
async function getMagnetId(magnet) {
    const API_KEY = 'your_api_key'; // Replace with your API key
    const agent = 'myAppName'; // Replace with your app name
  
    try {
      const response = await axios.get(`https://api.alldebrid.com/v4/magnet/upload?agent=${agent}&apikey=${API_KEY}&magnets[]=${encodeURIComponent(magnet)}`);
      const magnetID = response.data.data.magnets[0].id;
      return magnetID;
    } catch (error) {
      console.error('Failed to upload magnet link', error);
      return null;
    }
  }
  
  // Now you can use this function in your routes
  router.post('/debrid-magnet/upload', async (req, res) => {
    const { magnet } = req.body;
    const magnetID = await getMagnetId(magnet);
  
    if (magnetID) {
      res.json({ magnetID });
    } else {
      res.status(500).json({ error: 'Failed to upload magnet link' });
    }
  });
  
// Route for getting the status of a magnet link
router.get('/debrid-magnet/status/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.alldebrid.com/v4/magnet/status?agent=${agent}&apikey=${API_KEY}&id=${encodeURIComponent(id)}`);
    const links = response.data.data.magnets.links;

    res.json({ links });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get magnet link status' });
  }
});

module.exports = router;
module.exports.getMagnetId = getMagnetId;