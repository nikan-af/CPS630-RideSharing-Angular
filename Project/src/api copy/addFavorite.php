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
        gets the userId and productId and trims the content and stores them in the variables.
    */
    $userId = mysqli_real_escape_string($con, trim($request->userId));
    $productId = mysqli_real_escape_string($con, trim($request->productId));

    /*
        Inserts the record into the favorites table.
    */
    $sql = "INSERT INTO favorites(userId, productId) VALUES('$userId', '$productId')";
    $result = mysqli_query($con, $sql);

    /*
        If the query is invalid it will return the error message as response.
    */
    if (!$result) {
        die('Invalid Query: ' . $con->error);
    }

    if ($result != 1) {
        http_response_code(404);
    }
    http_response_code(200);
}
?>