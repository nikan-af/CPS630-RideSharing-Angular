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
    public $DriverId;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function readAll() {
        $query = "SELECT 
                    * FROM
                        " . $this->tblName;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO cps630.$this->tblName(OrderId, Distance, Duration, StartAddress, EndAddress, StartLocationLat, StartLocationLng, EndLocationLat, EndLocationLng, CarId, DriverId) VALUES";

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
            $DriverId = $this->Trips[$i]->DriverId; 

            $query .= "($this->OrderId, '$Distance', '$Duration', '$StartAddress', '$EndAddress', '$StartLocationLat', '$StartLocationLng', '$EndLocationLat', '$EndLocationLng', '$CarId', '$DriverId')";
            if (count($this->Trips) > $i+1) {
                $query .= ", ";
            }
        }

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function createOne() {
        $query = "INSERT INTO cps630.$this->tblName(OrderId, Distance, Duration, StartAddress, EndAddress, StartLocationLat, StartLocationLng, EndLocationLat, EndLocationLng, CarId, DriverId) VALUES($this->OrderId, '$this->Distance', '$this->Duration', '$this->StartAddress', '$this->EndAddress', '$this->StartLocationLat', '$this->StartLocationLng', '$this->EndLocationLat', '$this->EndLocationLng', '$this->CarId', '$this->DriverId')";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function delete() {
        $query = "DELETE FROM cps630.$this->tblName WHERE TripId=$this->TripId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function update() {
        $query = "Update cps630.$this->tblName SET TripId='$this->TripId', OrderId='$this->OrderId', Distance='$this->Distance', Duration='$this->Duration', StartAddress='$this->StartAddress', EndAddress='$this->EndAddress', StartLocationLat='$this->StartLocationLat', StartLocationLng='$this->StartLocationLng', EndLocationLat='$this->EndLocationLat', EndLocationLng='$this->EndLocationLng', CarId='$this->CarId', DriverId='$this->DriverId' WHERE TripId=$this->TripId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>