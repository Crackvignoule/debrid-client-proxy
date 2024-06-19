// PHP

// function debrid_torrent($file) {
// 	global $API_KEY;
// 	global $counter;
// 	$ch = curl_init("https://api.alldebrid.com/v4/magnet/upload/file?agent=myAppName&apikey=$API_KEY");
// 	curl_setopt($ch, CURLOPT_POST, true);
// 	curl_setopt($ch, CURLOPT_POSTFIELDS, ['files[0]' => $file]);
// 	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// 	$result = curl_exec($ch);
// 	$data = json_decode($result);	
// 	$magnetID = $data->data->files[0]->id;

// 	// Authentificated endpoint with valid apikey
// 	$context = stream_context_create([ 'http' => [ 'ignore_errors' => true ] ]); // Suppress PHP warnings on HTTP status code >= 400
// 	$apiEndpoint = "https://api.alldebrid.com/v4/magnet/status?agent=myAppName&apikey=$API_KEY";
// 	$apiEndpointOnlyOne = "https://api.alldebrid.com/v4/magnet/status?agent=myAppName&apikey=$API_KEY&id=" . urlencode($magnetID);
// 	$apiEndpointOnlyActive = "https://api.alldebrid.com/v4/magnet/status?agent=myAppName&apikey=$API_KEY&status=active";

// 	$response = json_decode(file_get_contents($apiEndpointOnlyOne, false, $context));
// 	foreach ($response->data->magnets->links as $linkObj) {
//    	// echo $linkObj->link . "\n";
// 	$link=$linkObj->link;
// 	$counter++;
// 	debrid_links([$link]);
// }}

// use debrid_links afterwards

const express = require('express');
const fs = require('fs');
const axios = require('axios');
const router = express.Router();
const { getMagnetId } = require('./debridMagnetRoutes');

const agent = 'myAppName'; // Replace with your app name

router.post('/debrid-torrent', (req, res) => {
  const filePath = `uploads/${req.body.filename}`;
  const API_KEY = req.params.key;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read file' });
    }

    axios.post(`https://api.alldebrid.com/v4/magnet/upload/file?agent=${agent}&apikey=${API_KEY}`, { 'files[0]': data })
      .then(response => {
        const magnetID = response.data.data.files[0].id;
        console.log(`Magnet ID: ${magnetID}`);

        // now use debrid_magnet_id
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to upload file to AllDebrid' });
      });
  });
});

module.exports = router;