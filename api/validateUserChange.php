<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

// Connection file to the database
include("db_connect.php");

function isPasswordCorrect($passwordForm, $pseudo, $bdd)
{
  //  Retrieve pseudo and password from database
  $req = $bdd->prepare('SELECT password FROM user WHERE pseudo = :pseudo');
  $req->execute(array(
    'pseudo' => $pseudo));
  $resultat = $req->fetch();
  $isPasswordCorrect = password_verify($passwordForm, $resultat['password']);

  if (!$resultat || !$isPasswordCorrect)
  {
    $response = array(
      "isPasswordCorrect" => false,
      "changeSucceed" => false
    );
    echo json_encode($response);
    return false;
  }

  return true;
}

// CHANGE PASSWORD
if (isset($_POST["password"]) && isset($_POST["newPassword"]) && isset($_POST["pseudo"]))
{
  $password = $_POST["password"];
  $newPassword = $_POST["newPassword"];
  $pseudo = $_POST["pseudo"];

  if (!isPasswordCorrect($password, $pseudo, $bdd))
    return;

  // update password
  $pass_hache = password_hash($_POST['newPassword'], PASSWORD_DEFAULT);
  $req = $bdd->prepare('UPDATE user SET password = :newPass WHERE pseudo = :pseudo');
  $req->execute(array(
    'newPass' => $pass_hache,
    'pseudo' => $pseudo,
  ));

  // return success response
  $response = array(
    "isPasswordCorrect" => true,
    "changeSucceed" => true
  );
  echo json_encode($response);

}
// CHANGE COLOR
else if (isset($_POST["password"]) && isset($_POST["newColor"]) && isset($_POST["pseudo"]))
{
  $password = $_POST["password"];
  $newColor = $_POST["newColor"];
  $pseudo = $_POST["pseudo"];

  if (!isPasswordCorrect($password, $pseudo, $bdd))
    return;

  // update color
  $req = $bdd->prepare('UPDATE user SET color = :newColor WHERE pseudo = :pseudo');
  $req->execute(array(
    'newColor' => $newColor,
    'pseudo' => $pseudo,
    ));

  // return success response
  $response = array(
    "isPasswordCorrect" => true,
    "changeSucceed" => true
  );
  echo json_encode($response);
}

else
{
  echo("Problème serveur");
  http_response_code(404);
}


?>