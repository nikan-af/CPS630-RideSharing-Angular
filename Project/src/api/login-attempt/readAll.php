<?php
include_once '../config/database.php';
include_once '../objects/loginAttempt.php';
  
$database = new Database();
$db = $database->getConnection();
  
$loginAttempt = new LoginAttempt($db);

$stmt = $loginAttempt->readAll();
$num = $stmt->rowCount();

if($num > 0){
    $loginAttempt_arr=array();
    $loginAttempt_arr["records"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
  
        $loginAttempt_item=array(
            "LoginAttemptId" => $LoginAttemptId,
            "Email" => $Email,
            "IPAddress" => $IPAddress,
            "InvalidCreds" => $InvalidCreds,
            "Timestamp" => $Timestamp
        );
  
        array_push($loginAttempt_arr["records"], $loginAttempt_item);
    }

    http_response_code(200);
    echo json_encode($loginAttempt_arr);
}
?>