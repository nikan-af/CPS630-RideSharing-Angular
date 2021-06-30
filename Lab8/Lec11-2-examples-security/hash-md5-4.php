
<!DOCTYPE html>
<html>
<body>

<?php

$passw= "password1";   
 
if (isset($_POST['password']) && !empty($_POST['password']))
{
       $new_passw=$_POST['password'];
     
        if(md5($new_passw)==md5($passw))
          {
               echo "<br> password successful";
           }
           else{
                          echo "<br> password not successful";
                    }
}
?>

<form action="hash-md5-4.php" method="post">
    <input type="text" name="password">
    <br>
    <input type="submit" >
</form>


  
</body>
</html>
 
 



