<?php

$username = "some-username";
$password = "some-password";
$secret = '584KWKwQzuwRKxIjz2DSK5snByYPDkHy';
$remote_url = 'https://api.coinhive.com/stats/site?secret=' + $secret;

// Create a stream
$opts = array(
  'http'=>array(
    'method'=>"GET"               
  )
);

$context = stream_context_create($opts);

// Open the file using the HTTP headers set above
$response = file_get_contents($remote_url, false, $context);

//header('Content-Type: application/json;charset=utf-8;');
echo json_encode($response);

?>