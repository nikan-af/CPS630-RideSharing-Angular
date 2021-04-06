<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once("../config/database.php");
    include_once("../objects/payment.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();

    $payment = new Payment($db);

    if (isset($postdata) && !empty($postdata)) {
        $payment->UserId = $request->UserId;
        $payment->CardNumber = $request->CardNumber;
        $payment->CardHolderName = $request->CardHolderName;
        $payment->ExpiryMonth = $request->ExpiryMonth;
        $payment->ExpiryYear = $request->ExpiryYear;
        $payment->ShippingLastName = $request->ShippingLastName;
        $payment->ShippingFirstName = $request->ShippingFirstName;
        $payment->ShippingAddressLine1 = $request->ShippingAddressLine1;
        $payment->ShippingAddressLine2 = $request->ShippingAddressLine2;
        $payment->PostalCode = $request->PostalCode;
        $payment->City = $request->City;
        $payment->StateOrProvince = $request->StateOrProvince;
        $payment->Country = $request->Country;

        if ($response = $payment->create()) {
            http_response_code(200);
            echo json_encode(array("message" => "Payment was created."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Payment was not created."));
        }
    } 
?>
