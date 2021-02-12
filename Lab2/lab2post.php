<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("lab2database.php");

$artWork = $_POST['artWork'];
$artWorkObj = (object)$artWork;

$sql = "INSERT INTO artwork (genre, type, subject, specification, year, museum) VALUES 
    ('$artWorkObj->genre', '$artWorkObj->type', '$artWorkObj->subject', '$artWorkObj->specification', 
        '$artWorkObj->year', '$artWorkObj->museum')";

if ($con->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $con->error;
}
?>
