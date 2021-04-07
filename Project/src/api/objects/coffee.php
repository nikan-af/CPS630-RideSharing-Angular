<?php

class Coffee {
    private $conn;
    private $tblName = "Coffee";

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

    public function create() {
        $query = "INSERT INTO cps630.$this->tblName(Name, Price, ImageURL, StoreCode) VALUES('$this->Name', '$this->Price', '$this->ImageURL', '$this->StoreCode')";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function update() {
        $query = "Update cps630.$this->tblName SET Name='$this->Name', Price='$this->Price', ImageURL='$this->ImageURL', StoreCode='$this->StoreCode' WHERE ProductId=$this->ProductId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function delete() {
        $query = "DELETE FROM cps630.$this->tblName WHERE ProductId=$this->ProductId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>