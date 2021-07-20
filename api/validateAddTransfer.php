<?php

// Connection file to the database
include("db_connect.php");


if (isset($_POST["transferCount"]) && isset($_POST["pseudo"]))
{
  $pseudo = $_POST["pseudo"];
  $transferCount = $_POST["transferCount"];
  $error = false;
  for($i = 0; $i < $transferCount; $i++)
  {
    // Retrieve data from form
    if (isset($_POST["value_" . strval($i)])) $value = $_POST["value_" . strval($i)]; 
    else { echo("Value Error. "); $error = true; break; }

    if (isset($_POST["date_" . strval($i)])) $date = $_POST["date_" . strval($i)]; 
    else { echo("Date Error. "); $error = true; break; }

    if (isset($_POST["type_" . strval($i)])) $type = $_POST["type_" . strval($i)]; 
    else { echo("Type Error. "); $error = true; break; }

    if (isset($_POST["comment_" . strval($i)])) $comment = $_POST["comment_" . strval($i)]; 
    else { echo("Comment Error. "); $error = true; break; }

    if (isset($_POST["perso_" . strval($i)])) $perso = 1; 
    else { $perso = 0; }

    // Add transfer into database
    $req = $bdd->exec("INSERT INTO transfer (
      id_user, 
      id_type, 
      value, 
      date, 
      perso, 
      comment)
    VALUES (
      (SELECT id_user FROM user WHERE pseudo = '$pseudo'), 
      (SELECT id_type FROM type WHERE label = '$type'), 
      '$value',
      '$date',
      '$perso',
      '$comment')");
  }

  if (!$error)
  {
    echo "<script type='text/javascript'>alert('" . $transferCount . " virements ajoutés.')</script>";
    echo '<meta http-equiv="refresh" content="0; url=http://localhost:3000/virements">';
  }
  else
  {
    echo("Problème formulaire, veuillez réessayer.");
  }


}

else
{
  echo("Problème serveur");
  http_response_code(404);
}

?>