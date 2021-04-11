<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once '../config/database.php';
    include_once '../objects/trip.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();
    
    $trip = new Trip($db);

    if(isset($postdata) && !empty($postdata)){
        $trip->TripId = $request->TripId;
        $trip->OrderId = $request->OrderId;
        $trip->Distance = $request->Distance;
        $trip->Duration = $request->Duration;
        $trip->StartAddress = $request->StartAddress;
        $trip->EndAddress = $request->EndAddress;
        $trip->StartLocationLat = $request->StartLocationLat;
        $trip->StartLocationLng = $request->StartLocationLng;
        $trip->EndLocationLat = $request->EndLocationLat;
        $trip->EndLocationLng = $request->EndLocationLng;
        $trip->CarId = $request->CarId;
        $trip->DriverId = $request->DriverId;

        if ($response = $trip->update()) {
            http_response_code(200);
            echo json_encode(array("message" => "Trip was updated."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Trip was not updated."));
        }
    }
?>