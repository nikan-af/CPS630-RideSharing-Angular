<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once '../config/database.php';
    include_once '../objects/user.php';
    include_once '../objects/loginAttempt.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $database = new Database();
    $db = $database->getConnection();
    
    $user = new User($db);
    $loginAttempt = new LoginAttempt($db);
    
    $enteredPassword = $request->password;
    $user->Email = $request->email;
    $keep_logged_in = $request->keep_logged_in;

    $stmt = $user->readUserByEmail();
    $num = $stmt->rowCount();

    if($num === 1){
        $user_arr=array();
        $user_arr["records"]=array();
      
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $loginAttempt->Email = $user->Email;
            $loginAttempt->IPAddress = get_client_ip();

            $hash = crypt($enteredPassword, $Salt);
            if ($hash !== $Password) {
                
                $loginAttempt->InvalidCreds = 1;

                $stmt = $loginAttempt->create();
                $remainingAttempts = $loginAttempt->getRemainingAttempts();

                if ($remainingAttempts == '0') {
                    $user->lockUser();
                }

                if ($Blocked == '1') {
                    http_response_code(403);
                    echo json_encode(array("message" => "Locked", "remainingAttempts" => $remainingAttempts));
                    exit(0);
                }

                http_response_code(403);
                echo json_encode(array("message" => "No users found.", "remainingAttempts" => $remainingAttempts));
                exit(0);
            }

            $loginAttempt->InvalidCreds = 0;
            $stmt = $loginAttempt->create();
            $remainingAttempts = $loginAttempt->getRemainingAttempts();

            if ($Blocked == '1') {
                http_response_code(403);
                echo json_encode(array("message" => "Locked", "remainingAttempts" => $remainingAttempts));
                exit(0);
            }

            $token = generateRandomToken();
            $cookie = $Email . ':' . $token;
            $mac = hash_hmac('sha256', $cookie, $Salt);
            $cookie .= ':' . $mac;
            setcookie('rememberme', $cookie);
            if ($token) {
                $user->Token = $token;
                $result = $user->storeToken();
            }
           
            $user_item=array(
                "UserId" => $UserId,
                "Name" => $Name,
                "Tel" => $Tel,
                "Email" => $Email,
                "Address" => $Address,
                "CityCode" => $CityCode,
                "Balance" => $Balance,
                "isAdmin" => $isAdmin,
                "cookie" => $cookie,
                "Blocked" => $Blocked
            );
      
            array_push($user_arr["records"], $user_item);
        }
      
        http_response_code(200);
        echo json_encode($user_arr);
        exit(0);
    } 

    function generateRandomToken() {
        return md5(uniqid(rand(), true));
    }

    function get_client_ip() {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
           $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
?>