<?php

class Inquiry {
    private $conn;
    private $tblName = "Inquiry";

    public $InquiryId;
    public $FName;
    public $LName;
    public $Message;
    public $TypeOfInquiry;
    public $Email;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->tblName;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO cps630.$this->tblName(FName, LName, Message, TypeOfInquiry, Email) VALUES('$this->FName', '$this->LName', '$this->Message', '$this->TypeOfInquiry', '$this->Email')";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function delete() {
        $query = "DELETE FROM cps630.$this->tblName WHERE InquiryId=$this->InquiryId";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>