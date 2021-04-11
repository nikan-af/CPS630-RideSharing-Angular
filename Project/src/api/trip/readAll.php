<?php

// include database and object files
include_once '../config/database.php';
include_once '../objects/trip.php';
  
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$trip = new Trip($db);

$stmt = $trip->readAll();
$num = $stmt->rowCount();
  
// check if more than 0 record found
if($num>0){
    $trip_arr=array();
    $trip_arr["records"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $trip_item=array(
            "TripId" => $TripId,
            "OrderId" => $OrderId,
            "Distance" => $Distance,
            "Duration" => $Duration,
            "StartAddress" => $StartAddress,
            "EndAddress" => $EndAddress,
            "StartLocationLat" => $StartLocationLat,
            "StartLocationLng" => $StartLocationLng,
            "EndLocationLat" => $EndLocationLat,
            "EndLocationLng" => $EndLocationLng,
            "CarId" => $CarId,
            "DriverId" => $DriverId
        );
  
        array_push($trip_arr["records"], $trip_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    echo json_encode($trip_arr);
} else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    echo json_encode(
        array("message" => "No trips found.")
    );
}
?>