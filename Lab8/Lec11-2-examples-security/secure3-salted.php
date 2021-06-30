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
if(isset($_POST['insert']))
{
   insertUser($_POST['username'], $_POST['password']);
}

if(isset($_POST['validate']))
{
   validateUser($_POST['username'], $_POST['password']);
} 

//Third approach: An Authentication system using salted passwords
function generateRandomSalt() {
  $charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/][{}\;:?.>,<!@#$%^&*()-_=+|';
  $randStringLen = 64;

  $randString = "";
  for ($i = 0; $i < $randStringLen; $i++) {
      $randString .= $charset[mt_rand(0, strlen($charset) - 1)];
  }

  return $randString;
}

function validateUser($username,$password){
  $pdo = new PDO("mysql:host=localhost;dbname=" . "cps630_2", "root", "");
  $sql = "SELECT Salt, Password FROM cps630_2.users WHERE Username=?";
  $smt = $pdo->prepare($sql);
  $smt->execute(array($username)); //execute the query
  if($smt->rowCount()){
    if ($row = $smt->fetch(PDO::FETCH_ASSOC)) {
      $hash = crypt($password, $row["Salt"]);
      if ($hash === $row["Password"]) {
        echo 'User is valid';
        return true; //record found, return true.
      }
    }
  }
  echo 'User is not valid';
  return false; //record not found matching credentials, return false
}

// Insert the user with the password salt generated, stored, and
// password hashed
function insertUser($username,$password){
  $pdo = new PDO("mysql:host=localhost;dbname=" . "cps630_2", "root", "");
  $salt = generateRandomSalt();
  $hash = crypt($password, $salt);
  $sql = "INSERT INTO cps630_2.users(Username, Password, Salt) VALUES('$username', '$hash', '$salt')";
  $smt = $pdo->prepare($sql);
  $smt->execute();
  print_r($smt);
  // print_r(crypt($password, $salt));
}
?>