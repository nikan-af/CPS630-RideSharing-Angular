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

    $user->Email = $request->email;
    $user->Password = $request->password;

    $stmt = $user->login();
    $num = $stmt->rowCount();

    if($num > 0){
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
                "isAdmin" => $isAdmin
            );
      
            array_push($user_arr["records"], $user_item);
        }
      
        http_response_code(200);
        echo json_encode($user_arr);
    } else {
        http_error_code(403);
        echo json_encode("No users found.");
    }
?>