<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once '../config/database.php';
    include_once '../objects/driver.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();
    
    $driver = new Driver($db);

    if(isset($postdata) && !empty($postdata)){
        $driver->DriverId = $request->DriverId;

        if ($response = $driver->delete()) {
            http_response_code(200);
            echo json_encode(array("message" => "Driver was deleted."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Driver was not deleted."));
        }
    }
?>