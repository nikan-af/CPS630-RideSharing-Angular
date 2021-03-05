<?php

class Payment {
    private $conn;
    private $tblName = "Payment";

    public $UserId;
    public $CardNumber;
    public $CardHolderName;
    public $ExpiryMonth;
    public $ExpiryYear;
    public $ShippingLastName;
    public $ShippingFirstName;
    public $ShippingAddressLine1;
    public $ShippingAddressLine2;
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
                        " . $this->tblName . " WHERE USERID=" . $this->UserId;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO $this->tblName(UserId, CardNumber, CardHolderName, ExpiryMonth, ExpiryYear, ShippingFirstName, ShippingLastName, ShippingAddressLine1, ShippingAddressLine2, PostalCode, City, StateOrProvince, Country) VALUES($this->UserId, '$this->CardNumber', '$this->CardHolderName', '$this->ExpiryMonth', '$this->ExpiryYear', '$this->ShippingFirstName', '$this->ShippingLastName', '$this->ShippingAddressLine1', '$this->ShippingAddressLine2', '$this->PostalCode'. '$this->City', '$this->StateOrProvince', '$this->Country')";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        print_r($this->conn->errorInfo());
        return $stmt;
    }
}
?>