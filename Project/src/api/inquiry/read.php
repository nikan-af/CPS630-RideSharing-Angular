<?php
include_once '../config/database.php';
include_once '../objects/inquiry.php';
  
$database = new Database();
$db = $database->getConnection();
  
$inquiry = new Inquiry($db);

$stmt = $inquiry->read();
$num = $stmt->rowCount();

if($num > 0){
    $inquiry_arr=array();
    $inquiry_arr["records"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
  
        $inquiry_item=array(
            "InquiryId" => $InquiryId,
            "FName" => $FName,
            "LName" => $LName,
            "Message" => $Message,
            "TypeOfInquiry" => $TypeOfInquiry,
            "Email" => $Email
        );
  
        array_push($inquiry_arr["records"], $inquiry_item);
    }

    http_response_code(200);
    echo json_encode($inquiry_arr);
}
?>