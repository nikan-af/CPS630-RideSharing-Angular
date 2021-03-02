<?php

class RideServicesOrder {
    private $conn;
    private $tblName = "RideServiceOrders";

    public $PaymentId;
    public $CarId;
    public $TripId;
    public $TotalFare;
    public $PickupDate;
    public $PickupTime;

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
        $query = "INSERT INTO $this->tblName(PaymentId, CarId, TripId, TotalFare, PickupDate, PickupTime, OrderTimestamp) VALUES($this->PaymentId, $this->CarId, $this->TripId, '$this->TotalFare', '$this->PickupDate', '$this->PickupTime', CURRENT_TIMESTAMP)";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>