<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once '../config/database.php';
include_once '../objects/order.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$database = new Database();
$db = $database->getConnection();

$order = new Order($db);

if (isset($postdata) && !empty($postdata)) {
    $order->OrderId = $request->OrderId;

    $stmt = $order->readOne();
    $num = $stmt->rowCount();

    // check if more than 0 record found
    if ($num > 0) {
        // products array
        $order_arr = array();
        $order_arr["records"] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $order_item = array(
                "OrderId" => $OrderId,
                "UserId" => $UserId,
                "OrderTotal" => $OrderTotal,
                "Timestamp" => $Timestamp
            );

            array_push($order_arr["records"], $order_item);
        }

        // set response code - 200 OK
        http_response_code(200);

        // show products data in json format
        echo json_encode($order_arr);
    } else {

        // set response code - 404 Not found
        http_response_code(404);

        // tell the user no products found
        echo json_encode(
            array("message" => "No orders found.")
        );
    }
}
?>