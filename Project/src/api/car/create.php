<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once("../config/database.php");
    include_once("../objects/car.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();

    $car = new Car($db);

    if (isset($postdata) && !empty($postdata)) {
        $car->CarCode = $request->CarCode;
        $car->CarColour = $request->CarColour;
        $car->CarModel = $request->CarModel;
        $car->CarPrice = $request->CarPrice;
        $car->ImageURL = $request->ImageURL;
        $car->AvailabilityCode = $request->AvailabilityCode;

        if ($response = $car->create()) {
            http_response_code(200);
            echo json_encode(array("message" => "Car was created."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Car was not created."));
        }
    } 
?>
