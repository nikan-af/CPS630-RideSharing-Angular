<?php
include_once '../config/database.php';
include_once '../objects/coffee.php';
  
$database = new Database();
$db = $database->getConnection();
  
$coffee = new Coffee($db);

$stmt = $coffee->read();
$num = $stmt->rowCount();

if($num > 0){
    $coffee_arr=array();
    $coffee_arr["records"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
  
        $coffee_item=array(
            "ProductId" => $ProductId,
            "StoreCode" => $StoreCode,
            "Name" => $Name,
            "Price" => $Price,
            "ImageURL" => $ImageURL
        );
  
        array_push($coffee_arr["records"], $coffee_item);
    }

    http_response_code(200);
    echo json_encode($coffee_arr);
}
?>