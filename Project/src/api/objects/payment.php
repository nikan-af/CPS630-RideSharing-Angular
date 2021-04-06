<?php

class Payment {
    private $conn;
    private $tblName = "Payment";

    public $OrderId;
    public $CardNumber;
    public $CardHolder;
    public $ExpiryMonth;
    public $ExpiryYear;
    public $CardHolderFirstName;
    public $CardHolderLastName;
    public $CardAddressLine1;
    public $CardAddressLine2;
    public $PostalCode;
    public $City;
    public $StateOrProvince;
    public $Country;

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
        $query = "INSERT INTO cps630.$this->tblName(OrderId, CardNumber, ExpiryMonth, ExpiryYear, CardHolderFirstName, CardHolderLastName, CardAddressLine1, CardAddressLine2, PostalCode, City, StateOrProvince, Country) VALUES($this->OrderId, '$this->CardNumber', '$this->ExpiryMonth', '$this->ExpiryYear', '$this->CardHolderFirstName', '$this->CardHolderLastName', '$this->CardAddressLine1', '$this->CardAddressLine2', '$this->PostalCode', '$this->City', '$this->StateOrProvince', '$this->Country')";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>