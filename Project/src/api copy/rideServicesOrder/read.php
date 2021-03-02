<?php

include_once '../config/database.php';
include_once '../objects/rideServicesOrder.php';

$database = new Database();
$db = $database->getConnection();

$rideServicesOrder = new RideServicesOrder($db);

$stmt = $rideServicesOrder->read();
$num = $stmt->rowCount();

if($num > 0) {
    $orders=array();
    $orders["records"]=array();

    while($row = $stmt->mysqli_fetch_assoc($result)) {
        extract($row);

        $order_item = array(
            "OrderId" => $OrderId,
            "PaymentId" => $PaymentId,
            "CarId" => $CarId,
            "TripId" => $TripId,
            "TotalFare" => $TotalFare,
            "PickupDate" => $PickupDate,
            "PickupTime" => $PickupTime
        );

        array_push($orders["records"], $order_item);
    }

    http_response_code(200);

    echo json_encode($orders);
}

?>