<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once '../config/database.php';
include_once '../objects/order.php';
include_once '../objects/payment.php';
include_once '../objects/trip.php';
include_once '../objects/orderproductmap.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$database = new Database();
$db = $database->getConnection();

$order = new Order($db);
$payment = new Payment($db);
$trip = new Trip($db);
$orderProductMap = new OrderProductMap($db);

if (isset($postdata) && !empty($postdata)) {
    $order->OrderTotal = (float) $request->Order->Total;
    $order->UserId = $request->Order->UserId;

    $paymentTemp = $request->Payment;
    $payment->CardHolder = $paymentTemp->CardHolder;
    $payment->CardHolderFirstName = $paymentTemp->CardHolderFirstName;
    $payment->CardHolderLastName = $paymentTemp->CardHolderLastName;
    $payment->CardAddressLine1 = $paymentTemp->CardAddressLine1;
    $payment->CardAddressLine2 = $paymentTemp->CardAddressLine2;
    $payment->StateOrProvince = $paymentTemp->StateOrProvince;
    $payment->CardNumber = $paymentTemp->CardNumber;
    $payment->ExpiryMonth = $paymentTemp->ExpiryMonth;
    $payment->ExpiryYear = $paymentTemp->ExpiryYear;
    $payment->City = $paymentTemp->City;
    $payment->PostalCode = $paymentTemp->PostalCode;
    $payment->Country = $paymentTemp->Country;

    $tripTemp = $request->Trips;
    $trip->Trips = $tripTemp;

    $productsTemp = $request->Products;
    $orderProductMap->Products = $productsTemp;

    if ($response = $order->create()) {
        $payment->OrderId = $db->lastInsertId();
        $trip->OrderId = $payment->OrderId;
        $orderProductMap->OrderId = $payment->OrderId;
        if ($response = $payment->create()) {
            if ($response = $trip->create()) {
                if ($response = $orderProductMap->create()) {
                    http_response_code(200);
                    echo json_encode(array("message" => "Order was created."));
                } else {
                    http_response_code(400);
                    echo json_encode(array("message" => "Order was not created."));
                }
            }
        }
    }
}
?>