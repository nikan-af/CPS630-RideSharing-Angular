<?php

class Order {
    private $conn;
    private $tblName = "Order";

    public $OrderId;
    public $UserId;
    public $OrderTotal;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT 
                    * FROM
                        " . $this->tblName . " WHERE USERID=" . $this->UserId;

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
}
?>