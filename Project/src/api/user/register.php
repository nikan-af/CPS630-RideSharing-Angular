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
        $user->Name = $request->fullName;
        $user->Email = $request->email;
        $user->Password = $request->password;
        $user->Tel = $request->phoneNumber;
        $user->Address = $request->address;
        $user->CityCode = $request->postal;

        if ($response = $user->register()) {
            http_response_code(200);
            echo json_encode(array("message" => "User was created."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "User was not created."));
        }
    }
?>