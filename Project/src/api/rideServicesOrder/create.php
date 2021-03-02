<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once("../config/database.php");
    include_once("../objects/rideServicesOrder.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();

    $order = new RideServicesOrder($db);

    if (isset($postdata) && !empty($postdata)) {
        $order->TripId = $request->TripId;
        $order->CarId = $request->CarId;
        $order->PaymentId = $request->PaymentId;
        $order->TotalFare = $request->TotalFare;
        $order->PickupDate = $request->PickupDate;
        $order->PickupTime = $request->PickupTime;

        if ($response = $order->create()) {
            http_response_code(200);
            echo json_encode(array("message" => "Order was created."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Order was not created."));
        }
    } 
?>
