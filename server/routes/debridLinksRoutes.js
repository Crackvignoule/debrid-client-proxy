// PHP
// function debrid_links($liste_links) {
//     global $API_KEY;
//     $counter = 1;
//     foreach ($liste_links as $link) {
//         $apiEndpoint = "https://api.alldebrid.com/v4/link/unlock?agent=myAppName&apikey=$API_KEY&link=" . urlencode($link);
//         $response = file_get_contents($apiEndpoint);
//         $json_response = json_decode($response);
// 	foreach ($json_response as $data) {
// 		if (!empty($data->filename)) {
//                 echo '<tr><td>' . $counter . '</td><td><a href="' . $data->link . '">' . $data->filename . '</a></td></tr>';
// 		$counter++;
//             }
//         }
//     }
// }