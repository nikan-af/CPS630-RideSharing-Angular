<?php

class Order {
    private $conn;
    private $tblName = "Order";

    public $OrderId;
    public $UserId;
    public $OrderTotal;
    public $Timestamp;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function readByUserId() {
        $query = "SELECT 
                    * FROM
                        " . $this->tblName . " WHERE USERID=" . $this->UserId;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readAll() {
        $query = "SELECT 
                    * FROM
                        cps630.$this->tblName";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO cps630.$this->tblName(UserId, OrderTotal, Timestamp) VALUES($this->UserId, '$this->OrderTotal', CURRENT_TIMESTAMP)";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function update() {
        $query = "Update cps630.$this->tblName SET UserId='$this->UserId', OrderTotal='$this->OrderTotal', Timestamp='$this->Timestamp' WHERE OrderId=$this->OrderId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function delete() {
        $query = "DELETE FROM cps630.$this->tblName WHERE OrderId=$this->OrderId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne() {
        $query = "SELECT * FROM cps630.$this->tblName WHERE OrderId=$this->OrderId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>