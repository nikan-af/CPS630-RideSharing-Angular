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
            gets the pwd, email and fullName and trims the content and stores them in the variables.
        */
        $pwd = mysqli_real_escape_string($con, trim($request->password));
        $email = mysqli_real_escape_string($con, trim($request->email));
        $password = mysqli_real_escape_string($con, trim($request->password));
        $fullName = mysqli_real_escape_string($con, trim($request->fullName));
        $phoneNumber = mysqli_real_escape_string($con, trim($request->phoneNumber));
        $address = mysqli_real_escape_string($con, trim($request->address));
        $postal = mysqli_real_escape_string($con, trim($request->postal));

        $sql = '';

        /*
            insert a new record into the users table using the information passed in by user when using the sign up for to register as a new user.
        */
        $sql = "INSERT INTO User(Name, Tel, Email, Address, CityCode, Password, Balance) VALUES('$fullName', '$phoneNumber', '$email', '$address', '$postal', '$password', 0)";
        if($result = mysqli_query($con,$sql)) {
            $sql = "SELECT * FROM cps530.users WHERE email = '$email'";
            if($result1 = mysqli_query($con,$sql)) {
                $rows = array();
                while($row = mysqli_fetch_assoc($result1)) {
                    $rows[] = $row;
                }
                echo json_encode($rows);
            }
        } else {
            http_response_code(404);
        }
    }
?>