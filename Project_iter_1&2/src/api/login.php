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
            gets the userId and email and trims the content and stores them in the variables.
        */
        $pwd = mysqli_real_escape_string($con, trim($request->password));
        $email = mysqli_real_escape_string($con, trim($request->email));
        $sql = '';

        /*
            gets the user record using the email address and the password used by the user to login on the login page.
        */
        $sql = "SELECT * FROM User where email='$email' and password='$pwd'";
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