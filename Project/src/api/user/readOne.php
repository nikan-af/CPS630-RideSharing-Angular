<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once '../config/database.php';
include_once '../objects/user.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

if (isset($postdata) && !empty($postdata)) {
    $user->UserId = $request->UserId;

    $stmt = $user->readOne();
    $num = $stmt->rowCount();

    // check if more than 0 record found
    if ($num > 0) {
        // products array
        $user_arr = array();
        $user_arr["records"] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            if ($Blocked == '0') {
                $Blocked = false;
            } else {
                $Blocked = true;
            }

            $user_item = array(
                "UserId" => $UserId,
                "Name" => $Name,
                "Tel" => $Tel,
                "Email" => $Email,
                "Address" => $Address,
                "CityCode" => $CityCode,
                "Balance" => $Balance,
                "isAdmin" => $isAdmin,
                "Blocked" => $Blocked
            );

            array_push($user_arr["records"], $user_item);
        }

        // set response code - 200 OK
        http_response_code(200);

        // show products data in json format
        echo json_encode($user_arr);
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