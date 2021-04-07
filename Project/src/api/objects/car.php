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

    public function create() {
        $query = "INSERT INTO cps630.$this->tblName(CarCode, CarModel, AvailabilityCode, CarColour, ImageURL, CarPrice) VALUES('$this->CarCode', '$this->CarModel', '$this->AvailabilityCode', '$this->CarColour', '$this->ImageURL', '$this->CarPrice')";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function delete() {
        $query = "DELETE FROM cps630.$this->tblName WHERE CarId=$this->CarId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>