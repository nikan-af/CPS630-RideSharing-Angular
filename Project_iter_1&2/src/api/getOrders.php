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
            gets the userId and productId and trims the content and stores them in the variables.
        */
        $userId = mysqli_real_escape_string($con, trim($request->userId));
        $sql = '';

        /*
            Gets the orders placed by a user and changes the formating of the order timestamp to DD Month, YYYY to be used for sorting on the front-end.
        */
        $sql = "SELECT *, DATE_FORMAT(orderTimestamp, '%d %b, %Y') AS timestamp  FROM cps530.orders INNER JOIN cps530.products ON cps530.orders.productId = cps530.products.productId where userId='$userId' ORDER BY orderTimestamp DESC";
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