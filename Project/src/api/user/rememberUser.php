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
$cookie = $request->cookie;

function generateRandomToken() {
    return md5(uniqid(rand(), true));
}

if ($cookie) {
    list($email, $token, $mac) = explode(':', $cookie);
    if ($email) {
        $user->Email = $email;
        $stmt = $user->readByEmail();

        if ($stmt->rowCount() > 0) {
            $user_arr=array();
            $user_arr["records"]=array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                if (hash_hmac('sha256', $Email . ':' . $Token, $Salt) !== $mac) {
                    return false;
                }

                if ($Token === $token) {
                    $token = generateRandomToken();
                    $cookie = $Email . ':' . $token;
                    $mac = hash_hmac('sha256', $cookie, $Salt);
                    $cookie .= ':' . $mac;
                    setcookie('rememberme', $cookie);
                    if ($token) {
                        $user->Token = $token;
                        $result = $user->storeToken();
                    }

                    $user_item = array(
                        "UserId" => $UserId,
                        "Name" => $Name,
                        "Tel" => $Tel,
                        "Email" => $Email,
                        "Address" => $Address,
                        "CityCode" => $CityCode,
                        "Balance" => $Balance,
                        "isAdmin" => $isAdmin,
                        "cookie" => $cookie
                    );
    
                    array_push($user_arr["records"], $user_item);

                    http_response_code(200);
                    echo json_encode($user_arr);
                    exit(0);
                }
            }
        }
    }
}
?>
