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