<h1>Insert New User</h1>
<form action="" method="post">
    <input type="text" name="username" placeholder="Enter your username" required>
    <input type="password" name="password" placeholder="Enter your password" required>
    <input type="submit" name="insert" value="Insert">
</form>

<hr>

<h1>Validate User</h1>
<form action="" method="post">
    <input type="text" name="username" placeholder="Enter your username" required>
    <input type="password" name="password" placeholder="Enter your password" required>
    <input type="submit" name="validate" value="Insert">
</form>

<?php

function insertUser($username, $password) {
  $pdo = new PDO("mysql:host=localhost;dbname=" . "cps630_2", "root", "");
  $sql = "INSERT INTO cps630_2.users(Username,Password) VALUES('$username','$password')";
  $smt = $pdo->prepare($sql);
  $smt->execute(); 
  print_r($smt);
}

if(isset($_POST['insert']))
{
   insertUser($_POST['username'], $_POST['password']);
}

if(isset($_POST['validate']))
{
   validateUser($_POST['username'], $_POST['password']);
} 

//Check if the credentials match a user in the system
function validateUser($username,$password){
  $pdo = new PDO("mysql:host=localhost;dbname=" . "cps630_2", "root", "");
  $sql = "SELECT ID FROM cps630_2.users WHERE Username='$username' AND Password='$password'";
  $smt = $pdo->prepare($sql);
  $smt->execute(); //execute the query
  if($smt->rowCount()){
    echo "User is valid.";
    return true; //record found, return true.
  } else {
    echo "User is not valid.";
    return false; //record not found matching credentials, return false
  }
}
?>


