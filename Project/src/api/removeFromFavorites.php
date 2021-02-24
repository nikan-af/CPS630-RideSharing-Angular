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
        deletes favorite product using the userId and productId.
    */
    $sql = "DELETE FROM cps530.favorites WHERE userId = '$userId' AND productId = '$productId'";
    $result = mysqli_query($con, $sql);
    if (!$result) {
        die('Invalid Query: ' . $con->error);
    }
    echo $result;
    if ($result != 1) {
        http_response_code(404);
    }

    http_response_code(200);
}
?>