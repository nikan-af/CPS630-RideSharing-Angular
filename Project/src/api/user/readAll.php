<?php

// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
  
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$user = new User($db);

$stmt = $user->readAll();
$num = $stmt->rowCount();
  
// check if more than 0 record found
if($num>0){
    // products array
    $user_arr=array();
    $user_arr["records"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
  
        $user_item=array(
            "UserId" => $UserId,
            "Name" => $Name,
            "Tel" => $Tel,
            "Email" => $Email,
            "Address" => $Address,
            "CityCode" => $CityCode,
            "Balance" => $Balance,
            "isAdmin" => $isAdmin,
            "Salt" => $Salt,
            "Token" => $Token
        );
  
        array_push($user_arr["records"], $user_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show products data in json format
    echo json_encode($user_arr);
} else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no products found
    echo json_encode(
        array("message" => "No orders found.")
    );
}
?>