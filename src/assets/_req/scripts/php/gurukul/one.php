<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type: application/json, X-Auth-Token , Authorization");
$data = json_decode(file_get_contents("php://input"), true);
$headers = apache_request_headers();

    // print_r($headers);
    // echo " Class >> ".$v_value." function >>".$v_funct;
    // echo $headers;
    // echo http_get_request_body();
    $firstname = $_REQUEST['firstname'];
    $lastname = $_REQUEST['lastname'];

    // echo 'Your name is ' . $lastname .' ' . $firstname;
   $code= sprintf('%06x', mt_rand(0, 16777215));
    echo $code;
?>
