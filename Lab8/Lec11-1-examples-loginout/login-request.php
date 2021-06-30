

//Login form
<html>
<body>

<form action="" method="post">
    <input type="text" name="username" placeholder="Enter your username" required>
    <input type="password" name="password" placeholder="Enter your password" required>
    <input type="submit" value="Submit">
</form>


// Login request 
<?php

$db_host = "localhost";
$db_name = "cps630_2";
$db_user = "root";
$db_pass = "";

//start first
session_start();

if ( ! empty( $_POST ) ) 
{
    if ( isset( $_POST['username'] ) && isset( $_POST['password'] ) ) 
   {
        
        $con = new mysqli($db_host, $db_user, $db_pass, $db_name);
        $stmt = $con->prepare("SELECT * FROM cps630_2.users WHERE username = ?");
        $stmt->bind_param('s', $_POST['username']);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_object();
        
    	// Verify user password and set $_SESSION
    	if ( $_POST['password'] === $user->password ) {
            $_SESSION['user_id'] = $user->ID;
            echo "Hello $user->username you are logged in.";
    	} else {
            echo "Invalid credentials.";
        }
    }
}
?>

</body>
</html> 