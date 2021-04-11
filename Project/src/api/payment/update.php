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

    if(isset($postdata) && !empty($postdata)){
        $payment->PaymentId = $request->PaymentId;
        $payment->OrderId = $request->OrderId;
        $payment->CardNumber = $request->CardNumber;
        $payment->ExpiryMonth = $request->ExpiryMonth;
        $payment->ExpiryYear = $request->ExpiryYear;
        $payment->CardHolderFirstName = $request->CardHolderFirstName;
        $payment->CardHolderLastName = $request->CardHolderLastName;
        $payment->CardAddressLine1 = $request->CardAddressLine1;
        $payment->CardAddressLine2 = $request->CardAddressLine2;
        $payment->PostalCode = $request->PostalCode;
        $payment->City = $request->City;
        $payment->StateOrProvince = $request->StateOrProvince;
        $payment->Country = $request->Country;

        if ($response = $payment->update()) {
            http_response_code(200);
            echo json_encode(array("message" => "Payment was updated."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Payment was not updated."));
        }
    }
?>