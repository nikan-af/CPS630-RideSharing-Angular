<?php

class Flower {
    private $conn;
    private $tblName = "Flower";

    public $ProductId;
    public $Name;
    public $Price;
    public $ImageURL;
    public $StoreCode;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->tblName;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>