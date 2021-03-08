<?php

class Coffee {
    private $conn;
    private $tblName = "Coffee";

    public $BeverageId;
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