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
    // VALUE
    if (isset($_POST["value_" . strval($i)]))
    {
      $value = $_POST["value_" . strval($i)]; 
    } 
    else 
    { 
      echo("Value Error. "); 
      $error = true; 
      break; 
    }

    // DATE
    if (isset($_POST["date_" . strval($i)]))
    {
      // Check whether date option exists or not
      if (!isset($_POST["date_option"]))
      {
        echo("Date Option Error. "); 
        $error = true; 
        break;
      } 

      // Date Format: YYYY-MM-DD
      if ($_POST["date_option"] == "complete") 
      {
        $date = $_POST["date_" . strval($i)];
      }
      // Date Format: DD
      else
      {
        // Retrieve current month
        if ($_POST["date_option"] == "current_month")
        {
          $month = date("m");
        }
        // Retrieve month choice
        else if ($_POST["date_option"] == "other_month")
        {
          if (!isset($_POST["month_choice"])) 
          {
            echo("Month Choice Error. "); 
            $error = true; 
            break;
          }
          $month = $_POST["month_choice"];
        }
        else
        {
          echo("Invalid Date Option."); 
          $error = true; 
          break;
        }

        $year = date("Y");
        $date = $year . "-" . $month . "-" . $_POST["date_" . strval($i)];
      }
    }  
    else 
    { 
      echo("Date Error. "); 
      $error = true; 
      break; 
    }

    // TYPE
    if (isset($_POST["type_" . strval($i)])) $type = $_POST["type_" . strval($i)]; 
    else { echo("Type Error. "); $error = true; break; }

    // COMMENT
    if (isset($_POST["comment_" . strval($i)])) $comment = $_POST["comment_" . strval($i)]; 
    else { echo("Comment Error. "); $error = true; break; }

    // PERSO
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