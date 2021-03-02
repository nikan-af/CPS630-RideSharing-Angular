<?php

class Car {
    private $conn;
    private $tblName = "Car";

    public $CarId;
    public $CarModel;
    public $CarCode;
    public $AvailabilityCode;
    public $CarColour;
    public $ImageURL;
    public $CarPrice;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT 
                    * FROM
                        " . $this->tblName;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>