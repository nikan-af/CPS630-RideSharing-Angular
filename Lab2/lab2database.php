<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$con = mysqli_init();
mysqli_real_connect($con, "localhost", "root", "", "cps630", 3306);

if ($con->connect_error) {
    die('Error : (' . $con->connect_errno . ') ' . $con->connect_error);
}

?>