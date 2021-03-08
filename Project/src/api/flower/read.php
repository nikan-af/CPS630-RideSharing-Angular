<?php
include_once '../config/database.php';
include_once '../objects/flower.php';
  
$database = new Database();
$db = $database->getConnection();
  
$flower = new Flower($db);

$stmt = $flower->read();
$num = $stmt->rowCount();

if($num > 0){
    $flower_arr=array();
    $flower_arr["records"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
  
        $flower_item=array(
            "ProductId" => $ProductId,
            "StoreCode" => $StoreCode,
            "Name" => $Name,
            "Price" => $Price,
            "ImageURL" => $ImageURL
        );
  
        array_push($flower_arr["records"], $flower_item);
    }

    http_response_code(200);
    echo json_encode($flower_arr);
}
?>