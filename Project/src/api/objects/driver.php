<?php

class Driver {
    private $conn;
    private $tblName = "Driver";

    public $DriverId;
    public $FirstName;
    public $LastName;
    public $EnglishProficiency;
    public $DriverExperienceYears;
    public $PlaysMusic;
    public $DrivingSpeed;
    public $Appearance;
    public $SocialPreferences;
    public $DriverRating;
    public $DriverPrice;
    public $ImageURL;

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
        $query = "INSERT INTO cps630.$this->tblName(FirstName, LastName, EnglishProficiency, DriverExperienceYears, PlaysMusic, DrivingSpeed, Appearance, SocialPreferences, DriverRating, DriverPrice, ImageURL) VALUES('$this->FirstName', '$this->LastName', '$this->EnglishProficiency', $this->DriverExperienceYears, '$this->PlaysMusic', '$this->DrivingSpeed', '$this->Appearance', '$this->SocialPreferences', '$this->DriverRating', '$this->DriverPrice', '$this->ImageURL')";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function update() {
        $query = "Update cps630.$this->tblName SET FirstName='$this->FirstName', LastName='$this->LastName', EnglishProficiency='$this->EnglishProficiency', DriverExperienceYears=$this->DriverExperienceYears, PlaysMusic='$this->PlaysMusic', DrivingSpeed='$this->DrivingSpeed', Appearance='$this->Appearance', SocialPreferences='$this->SocialPreferences', DriverRating='$this->DriverRating', ImageURL='$this->ImageURL' WHERE DriverId=$this->DriverId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function delete() {
        $query = "DELETE FROM cps630.$this->tblName WHERE DriverId=$this->DriverId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readByDriverId() {
        $query = "SELECT 
                    * FROM
                        " . $this->tblName . " WHERE DriverId=" . $this->DriverId;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>