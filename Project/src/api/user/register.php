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

    if(isset($postdata) && !empty($postdata)){
        $salt = getSalt();
        $user->Name = $request->Name;
        $user->Email = $request->Email;
        $user->Password = crypt($request->Password, $salt);
        $user->Tel = $request->Tel;
        $user->Address = $request->Address;
        $user->CityCode = $request->CityCode;
        $user->Balance = $request->Balance;
        $user->isAdmin = $request->isAdmin;
        $user->Salt = $salt;
        

        if ($response = $user->register()) {
            http_response_code(200);
            echo json_encode(array("message" => "User was created."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "User was not created."));
        }
    }

    function getSalt() {
        $charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/][{}\;:?.>,<!@#$%^&*()-_=+|';
        $randStringLen = 64;
   
        $randString = "";
        for ($i = 0; $i < $randStringLen; $i++) {
            $randString .= $charset[mt_rand(0, strlen($charset) - 1)];
        }
   
        return $randString;
   }

// function getSalt($len = 8) {
// 	$chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()-=_+';
// 	$l = strlen($chars) - 1;
// 	$str = '';
// 	for ($i = 0; $i &lt; $len; ++$i) {
// 		$str .= $chars[rand(0, $l];
//  	}
// 	return $str;
// }
?>