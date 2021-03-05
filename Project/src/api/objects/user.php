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

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login() {
        $query = "SELECT * FROM $this->tblName WHERE Email='$this->Email' and Password='$this->Password'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function register() {
        $query = "INSERT INTO User(Name, Tel, Email, Address, CityCode, Password) VALUES('$this->Name', '$this->Tel', '$this->Email', '$this->Address', '$this->CityCode', '$this->Password')";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>