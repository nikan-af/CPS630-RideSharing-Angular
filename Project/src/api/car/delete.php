<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once '../config/database.php';
    include_once '../objects/car.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();
    
    $car = new Car($db);

    if(isset($postdata) && !empty($postdata)){
        $car->CarId = $request->CarId;

        if ($response = $car->delete()) {
            http_response_code(200);
            echo json_encode(array("message" => "Car was deleted."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Car was not deleted."));
        }
    }
?>