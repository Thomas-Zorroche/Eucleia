<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

// Connection file to the database
include("db_connect.php");

// If data can be sent to database. If false, this means an error happened.
$VALID_FORM = true;

function getValue( &$value, $label)
{
  global $validForm;
  if (!isset($_POST[$label]))
  {
    echo ("[ERROR] validateLogin: Invalid" . $label);
    $VALID_FORM = false;
    return false;
  }

  $value = $_POST[$label];
  return true;
}

// ---------------------------------------------------------------
// ------------------------ validateLogin ------------------------
// ---------------------------------------------------------------

//  Retrieve pseudo and password from form
if (!getValue($pseudo, "pseudo"))     return;
if (!getValue($password, "password")) return;

//  Retrieve pseudo and password from database
$req = $bdd->prepare('SELECT password FROM user WHERE pseudo = :pseudo');
$req->execute(array(
  'pseudo' => $pseudo));
$resultat = $req->fetch();

$isPasswordCorrect = password_verify($password, $resultat['password']);

if (!$resultat || !$isPasswordCorrect)
{
  echo '1'; // Login Failed
}
else if ($isPasswordCorrect)
{
  echo '0'; // Login Succeed

}


?>