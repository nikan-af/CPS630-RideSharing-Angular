<?php

// include database and object files
include_once '../config/database.php';
include_once '../objects/review.php';
  
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$review = new Review($db);

$stmt = $review->read();
$num = $stmt->rowCount();
  
// check if more than 0 record found
if($num>0){
    // products array
    $review_arr=array();
    $review_arr["records"]=array();
  
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $review_item=array(
            "FirstName" => $FirstName,
            "LastName" => $LastName,
            "Message" => $Message,
            "Rating" => $Rating,
            "ServiceType" => $ServiceType,
            "Timestamp" => $Timestamp
        );
  
        array_push($review_arr["records"], $review_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show review data in json format
    echo json_encode($review_arr);
} else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no products found
    echo json_encode(
        array("message" => "No reviews found.")
    );
}
?>