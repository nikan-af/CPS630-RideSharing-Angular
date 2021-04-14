<?php

class LoginAttempt {
    private $conn;
    private $tblName = "LoginAttempt";

    public $LoginAttemptId;
    public $Email;
    public $IPAddress;
    public $InvalidCreds;
    public $Timestamp;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function readByEmail() {
        $query = "SELECT 
                    * FROM
                        " . $this->tblName . " WHERE Email=" . $this->Email;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readAttemptsWithin5Minutes() {
        $query = "SELECT 
                    * FROM
                        cps630.$this->tblName";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO cps630.$this->tblName(Email, IPAddress, Timestamp, InvalidCreds) VALUES('$this->Email', '$this->IPAddress', CURRENT_TIMESTAMP, $this->InvalidCreds)";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    } 

    public function delete() {
        $query = "DELETE FROM cps630.$this->tblName WHERE LoginAttemptId=$this->LoginAttemptId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getRemainingAttempts() {
        $query = "SELECT CASE WHEN 5 - COUNT(LoginAttemptId) <= 0 THEN 0 WHEN 5 - COUNT(LoginAttemptId) > 0 THEN 5 - COUNT(LoginAttemptId) END AS RemainingAttempts FROM LoginAttempt WHERE TImestamp >= CURRENT_TIMESTAMP - INTERVAL 5 MINUTE && Email = '$this->Email' && IPAddress = '$this->IPAddress' && InvalidCreds = 1";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

        return $result[0];
    }

    public function readAll() {
        $query = "SELECT 
                    * FROM
                        cps630.$this->tblName";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>