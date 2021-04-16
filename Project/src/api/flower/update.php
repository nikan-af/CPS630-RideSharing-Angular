<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once '../config/database.php';
    include_once '../objects/flower.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();
    
    $flower = new Flower($db);

    if(isset($postdata) && !empty($postdata)){
        $flower->ProductId = $request->ProductId;
        $flower->Name = $request->Name;
        $flower->ImageURL = $request->ImageURL;
        $flower->Price = $request->Price;
        $flower->StoreCode = $request->StoreCode;

        if ($response = $flower->update()) {
            http_response_code(200);
            echo json_encode(array("message" => "Coffee record was updated."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Coffee record was not updated."));
        }
    }
?>