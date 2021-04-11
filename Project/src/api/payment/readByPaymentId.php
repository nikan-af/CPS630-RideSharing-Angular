<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once '../config/database.php';
include_once '../objects/payment.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$database = new Database();
$db = $database->getConnection();

$payment = new Payment($db);

if (isset($postdata) && !empty($postdata)) {
    $payment->PaymentId = $request->PaymentId;

    $stmt = $payment->readOne();
    $num = $stmt->rowCount();

    if ($num > 0) {
        $payment_arr = array();
        $payment_arr["records"] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $payment_item=array(
                "PaymentId" => $PaymentId,
                "OrderId" => $OrderId,
                "CardNumber" => $CardNumber,
                "ExpiryMonth" => $ExpiryMonth,
                "ExpiryYear" => $ExpiryYear,
                "CardHolderFirstName" => $CardHolderFirstName,
                "CardHolderLastName" => $CardHolderLastName,
                "CardAddressLine1" => $CardAddressLine1,
                "CardAddressLine2" => $CardAddressLine2,
                "PostalCode" => $PostalCode,
                "City" => $City,
                "StateOrProvince" => $StateOrProvince,
                "Country" => $Country
            );

            array_push($payment_arr["records"], $payment_item);
        }

        // set response code - 200 OK
        http_response_code(200);

        echo json_encode($payment_arr);
    } else {

        // set response code - 404 Not found
        http_response_code(404);

        echo json_encode(
            array("message" => "No payments found.")
        );
    }
}
?>