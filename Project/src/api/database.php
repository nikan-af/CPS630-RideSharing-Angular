<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

/*
    Uses the certificate to connect to microsoft azure db instance.
*/
$con=mysqli_init(); 
mysqli_real_connect($con, "localhost", "root", "", "cps630", 3306);
 
/*
    Returns error if the connection is not successful.
*/
if ($con->connect_error) {
    die('Error : ('. $con->connect_errno .') '. $con->connect_error);
}
?>