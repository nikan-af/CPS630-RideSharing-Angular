<?php

class Trip {
    private $conn;
    private $tblName = "Trip";

    public $Trips;
    public $TripId;
    public $OrderId;
    public $Distance;
    public $Duration;
    public $StartAddress;
    public $EndAddress;
    public $StartLocationLat;
    public $StartLocationLng;
    public $EndLocationLat;
    public $EndLocationLng;
    public $CarId;

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
        $query = "INSERT INTO cps630.$this->tblName(OrderId, Distance, Duration, StartAddress, EndAddress, StartLocationLat, StartLocationLng, EndLocationLat, EndLocationLng, CarId) VALUES";

        for ($i = 0; $i < count($this->Trips); $i++) {
            $Duration = $this->Trips[$i]->Duration;
            $Distance = $this->Trips[$i]->Distance;
            $StartAddress = $this->Trips[$i]->StartAddress;
            $EndAddress = $this->Trips[$i]->EndAddress;
            $StartLocationLat = $this->Trips[$i]->StartLocationLat;
            $StartLocationLng = $this->Trips[$i]->StartLocationLng;
            $EndLocationLat = $this->Trips[$i]->EndLocationLat;
            $EndLocationLng = $this->Trips[$i]->EndLocationLng;    
            $CarId = $this->Trips[$i]->CarId; 

            $query .= "($this->OrderId, '$Distance', '$Duration', '$StartAddress', '$EndAddress', '$StartLocationLat', '$StartLocationLng', '$EndLocationLat', '$EndLocationLng', '$CarId')";
            if (count($this->Trips) > $i+1) {
                $query .= ", ";
            }
        }

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>