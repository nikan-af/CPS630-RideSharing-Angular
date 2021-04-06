<?php

class OrderProductMap {
    private $conn;
    private $tblName = "OrderProductMap";

    public $Products;
    public $OrderProductMapId;
    public $OrderId;
    public $ProductId;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT 
                    * FROM
                        " . $this->tblName . " WHERE USERID = " . $this->UserId;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO cps630.$this->tblName(OrderId, ProductId) VALUES";

        for ($i = 0; $i < count($this->Products); $i++) {
            $ProductId = $this->Products[$i]->ProductId;  

            $query .= "($this->OrderId, '$ProductId')";
            if (count($this->Products) > $i+1) {
                $query .= ", ";
            }
        }

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>