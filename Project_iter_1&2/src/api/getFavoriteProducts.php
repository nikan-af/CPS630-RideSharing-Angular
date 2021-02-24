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
            Gets user's favorite products by joining favorites and products to get the products that are liked by the user.
        */
        $sql = "SELECT cps530.products.* FROM cps530.favorites INNER JOIN cps530.products ON cps530.favorites.productId = cps530.products.productId WHERE cps530.favorites.userId = '$userId'";
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