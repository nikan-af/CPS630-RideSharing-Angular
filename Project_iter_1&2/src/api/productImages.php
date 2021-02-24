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
            gets the productId and trims the content and stores them in the variables.
        */
        $productId = mysqli_real_escape_string($con, trim($request->productId));
        $sql = '';

        /*
            gets the product images using the productId
        */
        $sql = "SELECT * FROM cps530.productImages where productId='$productId'";
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