<?php

class User {
    private $conn;
    private $tblName = "User";

    public $UserId;
    public $Name;
    public $Tel;
    public $Email;
    public $Address;
    public $CityCode;
    public $Password;
    public $Balance;
    public $Salt;
    public $Token;
    public $Blocked;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login() {
        $query = "SELECT * FROM $this->tblName WHERE Email='$this->Email' and Password='$this->Password'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readAll() {
        $query = "SELECT * FROM $this->tblName";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function register() {
        $query = "INSERT INTO cps630.User(Name, Tel, Email, Address, CityCode, Password, Balance, isAdmin,Salt) VALUES('$this->Name', '$this->Tel', '$this->Email', '$this->Address', '$this->CityCode', '$this->Password', $this->Balance, '$this->isAdmin' , '$this->Salt')";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function delete() {
        $query = "DELETE FROM $this->tblName WHERE UserId = '$this->UserId'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function update() {
        $query = "Update $this->tblName SET Name='$this->Name', Tel='$this->Tel', Email='$this->Email', Address='$this->Address', CityCode='$this->CityCode', Balance=$this->Balance, isAdmin='$this->isAdmin', Blocked='$this->Blocked' WHERE UserId=$this->UserId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function readOne() {
        $query = "SELECT * FROM $this->tblName WHERE UserId=$this->UserId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readByEmail() {
        $query = "SELECT * FROM $this->tblName WHERE Email='$this->Email'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readUserByEmail() {
        $query = "SELECT * FROM $this->tblName WHERE Email='$this->Email'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function storeToken() {
        $query = "Update cps630.$this->tblName SET Token='$this->Token' WHERE Email='$this->Email'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function getSaltToken() {
        $query = "Select Salt, Token from cps630.$this->tblName WHERE Email='$this->Email'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function lockUser() {
        $query = "Update cps630.$this->tblName SET Blocked='1' WHERE Email='$this->Email'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function unlockUser() {
        $query = "Update cps630.$this->tblName SET Blocked='0' WHERE Email='$this->Email'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>