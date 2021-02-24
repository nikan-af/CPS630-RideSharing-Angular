<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("database.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($postdata) && !empty($postdata)) {
    /*
        parses the object stored in the post request
        gets the checkout form field data and trims the content and stores them in the variables.
    */
    $userId = mysqli_real_escape_string($con, trim($request->userId));
    $products = $request->products;
    $credit_card_number = mysqli_real_escape_string($con, trim($request->credit_card_number));
    $credit_card_holder = mysqli_real_escape_string($con, trim($request->credit_card_holder));
    $expiry_month = mysqli_real_escape_string($con, trim($request->expiry_month));
    $expiry_year = mysqli_real_escape_string($con, trim($request->expiry_year));
    $credit_card_first_name = mysqli_real_escape_string($con, trim($request->credit_card_first_name));
    $credit_card_last_name = mysqli_real_escape_string($con, trim($request->credit_card_last_name));
    $credit_card_address_line_1 = mysqli_real_escape_string($con, trim($request->credit_card_address_line_1));
    $credit_card_address_line_2 = mysqli_real_escape_string($con, trim($request->credit_card_address_line_2));
    $country = mysqli_real_escape_string($con, trim($request->country));
    $province = mysqli_real_escape_string($con, trim($request->province));
    $city = mysqli_real_escape_string($con, trim($request->city));
    $postal_code = mysqli_real_escape_string($con, trim($request->postal_code));

    /* 
        For each product item on the order we create a new record in orders table.
    */
    foreach ($products as $product) {
        $productId = $product->productId;
        $qty = $product->qty;
        $sql = "INSERT INTO orders(productId, qty, orderTimestamp, userId, credit_card_number, credit_card_holder, expiry_month, expiry_year, credit_card_first_name,
        credit_card_last_name, credit_card_address_line_1, credit_card_address_line_2, country, province, city, postal_code) 
        VALUES('$productId', '$qty', CURRENT_TIME, '$userId', '$credit_card_number', '$credit_card_holder', '$expiry_month', '$expiry_year', '$credit_card_first_name', 
        '$credit_card_last_name', '$credit_card_address_line_1', '$credit_card_address_line_2', '$country', '$province', '$city', '$postal_code')";
        $result = mysqli_query($con, $sql);
        if (!$result) {
            die('Invalid Query: ' . $con->error);
        }
        echo $result;
        if ($result != 1) {
            http_response_code(404);
        }
    }

    http_response_code(200);
}
?>