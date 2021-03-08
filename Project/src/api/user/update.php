<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once '../config/database.php';
    include_once '../objects/user.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();
    
    $user = new User($db);

    if(isset($postdata) && !empty($postdata)){
        $user->UserId = $request->UserId;
        $user->Name = $request->Name;
        $user->Email = $request->Email;
        $user->Tel = $request->Tel;
        $user->Address = $request->Address;
        $user->CityCode = $request->CityCode;
        $user->Balance = $request->Balance;
        $user->isAdmin = $request->isAdmin;

        if ($response = $user->update()) {
            http_response_code(200);
            echo json_encode(array("message" => "User record was updated."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "User record was not updated."));
        }
    }
?>