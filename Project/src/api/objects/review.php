<?php

class Review {
    private $conn;
    private $tblName = "Review";

    public $FirstName;
    public $LastName;
    public $Rating;
    public $Message;
    public $Timestamp;
    public $ServiceType;

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
        $query = "INSERT INTO cps630.$this->tblName(FirstName, LastName, Message, Rating, ServiceType, Timestamp) VALUES('$this->FirstName', '$this->LastName', '$this->Message', $this->Rating, '$this->ServiceType', '$this->Timestamp')";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>