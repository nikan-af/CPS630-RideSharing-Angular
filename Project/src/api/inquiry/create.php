<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once("../config/database.php");
    include_once("../objects/inquiry.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();

    $inquiry = new Inquiry($db);

    if (isset($postdata) && !empty($postdata)) {
        $inquiry->FName = $request->FName;
        $inquiry->LName = $request->LName;
        $inquiry->Email = $request->Email;
        $inquiry->Message = $request->Message;
        $inquiry->TypeOfInquiry = $request->TypeOfInquiry;

        if ($response = $inquiry->create()) {
            http_response_code(200);
            echo json_encode(array("message" => "Inquiry was created."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Inquiry was not created."));
        }
    } 
?>
