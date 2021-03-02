<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once("database.php");
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if(isset($postdata) && !empty($postdata)) {
        /*
            parses the object stored in the post request
            gets the userId and trims the content and stores them in the variables.
        */
        $userId = mysqli_real_escape_string($con, trim($request->userId));
        $sql = '';

        /*
            gets the last order made by the user.
        */
        $sql = "SELECT * FROM cps530.orders WHERE cps530.orders.userId = '$userId' ORDER BY cps530.orders.orderTimestamp DESC LIMIT 1";
        if($result = mysqli_query($con,$sql)) {
            $rows = array();
            while($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
            echo json_encode($rows);
        } else {
            http_response_code(404);
        }
    }
?>