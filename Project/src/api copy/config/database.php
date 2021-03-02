<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

class Database {
    private $host = "localhost";
    private $db_name = "cps630";
    private $username = "root";
    private $password = "";
    private $port_number = 3306;

    public $con;

    public function getConnection() {
        $this->con = mysqli_init();
        mysqli_real_connect($this->con, $this->host, $this->username, $this->password, $this->db_name, $this->port_number);

        if ($this->con->connect_error) {
            die('Error : ('. $this->con->connect_errno .') '. $this->con->connect_error);
        }

        return $this->con;
    }
}