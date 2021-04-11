<?php
include_once '../config/database.php';
include_once '../objects/driver.php';
  
$database = new Database();
$db = $database->getConnection();
  
$driver = new Driver($db);

$stmt = $driver->readAll();
$num = $stmt->rowCount();

if($num > 0){
    $driver_arr=array();
    $driver_arr["records"]=array();
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $driver_item=array(
            "DriverId" => $DriverId,
            "FirstName" => $FirstName,
            "LastName" => $LastName,
            "EnglishProficiency" => $EnglishProficiency,
            "DriverExperienceYears" => $DriverExperienceYears,
            "PlaysMusic" => $PlaysMusic,
            "DrivingSpeed" => $DrivingSpeed,
            "Appearance" => $Appearance,
            "SocialPreferences" => $SocialPreferences,
            "DriverRating" => $DriverRating,
            "DriverPrice" => $DriverPrice,
            "ImageURL" => $ImageURL
        );
  
        array_push($driver_arr["records"], $driver_item);
    }

    http_response_code(200);
    echo json_encode($driver_arr);
}
?>