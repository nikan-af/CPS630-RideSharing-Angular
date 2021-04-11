<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once '../config/database.php';
    include_once '../objects/driver.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();
    
    $driver = new Driver($db);

    if(isset($postdata) && !empty($postdata)){
        $driver->DriverId = $request->DriverId;
        $driver->FirstName = $request->FirstName;
        $driver->LastName = $request->LastName;
        $driver->EnglishProficiency = $request->EnglishProficiency;
        $driver->DriverExperienceYears = $request->DriverExperienceYears;
        $driver->PlaysMusic = $request->PlaysMusic;
        $driver->DrivingSpeed = $request->DrivingSpeed;
        $driver->Appearance = $request->Appearance;
        $driver->SocialPreferences = $request->SocialPreferences;
        $driver->DriverRating = $request->DriverRating;
        $driver->DriverPrice = $request->DriverPrice;
        $driver->ImageURL = $request->ImageURL;

        if ($response = $driver->update()) {
            http_response_code(200);
            echo json_encode(array("message" => "Driver record was updated."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Driver record was not updated."));
        }
    }
?>