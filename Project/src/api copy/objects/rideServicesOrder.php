<?php

class RideServicesOrder {
    private $con;
    private $tblName = "RideServiceOrders";

    public $OrderId;
    public $PaymentId;
    public $CarId;
    public $TripId;
    public $TotalFare;
    public $PickupDate;
    public $PickupTime;

    public function __construct($db) {
        $this->con = $db;
    }

    public function read() {
        $query = "SELECT 
                    * FROM
                        " . $this->tblName;

        $stmt = mysqli_query($this->con, $query);

        return $stmt;
    }
}
?>