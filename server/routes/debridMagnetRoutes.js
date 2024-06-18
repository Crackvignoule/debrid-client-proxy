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