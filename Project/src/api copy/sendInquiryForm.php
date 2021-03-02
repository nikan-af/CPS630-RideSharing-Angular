<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("database.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($postdata) && !empty($postdata)) {
    /*
        parses the object stored in the post request
        gets the first_name, last_name, email, type_of_inquiry and message and trims the content and stores them in the variables.
    */
    $first_name = mysqli_real_escape_string($con, trim($request->first_name));
    $last_name = mysqli_real_escape_string($con, trim($request->last_name));
    $email = mysqli_real_escape_string($con, trim($request->email));
    $type_of_inquiry = mysqli_real_escape_string($con, trim($request->type_of_inquiry));
    $message = mysqli_real_escape_string($con, trim($request->message));
    $sql = '';

    /*
        inserts a new record into the inquiries table to be later processed.
    */
    $sql = "INSERT INTO inquiries(first_name, last_name, email, message, type_of_inquiry, send_to_user) VALUES('$first_name', '$last_name', '$email', '$type_of_inquiry', '$message', 'N')";
    if ($result = mysqli_query($con, $sql)) {
        echo json_encode($result);
    } else {
        http_response_code(404);
    }
}
?>