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
        gets the email and fullname and schoolName and trims the content and stores them in the variables.
    */
    $email = mysqli_real_escape_string($con, trim($request->email));
    $fullname = mysqli_real_escape_string($con, trim($request->fullname));
    $schoolName = mysqli_real_escape_string($con, trim($request->schoolName));
    $sql = '';

    /*
        inserts a new record into the discount table to be processed later.
    */
    $sql = "INSERT INTO discount(email, fullname, schoolName, approved) VALUES('$email', '$fullname', '$schoolName', 'N')";
    if ($result = mysqli_query($con, $sql)) {
        echo json_encode($result);
    } else {
        http_response_code(404);
    }
}
?>