<?php

// Connection file to the database
include("db_connect.php");

// If data can be sent to database. If false, this means an error happened.
$VALID_FORM = true;

function getValue( &$value, $label)
{
  global $validForm;
  if (!isset($_POST[$label]))
  {
    echo ("[ERROR] validateAddTransfer: Invalid" . $label);
    $VALID_FORM = false;
    return false;
  }

  $value = $_POST[$label];
  return true;
}

function getDateValue(&$date, $label)
{
  if (!isset($_POST[$label]))
  {
    echo ("[ERROR] validateAddTransfer: Invalid" . $label);
    $VALID_FORM = false;
    return false;
  }

  // Retrieve date_option (CurrentMonth, OtherMonth, Complete)
  if (!getValue($dateOption, "date_option"))
    return false;

  // Date Format: YYYY-MM-DD
  if ($dateOption == "complete") 
  {
    $date = $_POST[$label];
    return true;
  }
  // Date Format: DD
  else
  {
    // Retrieve current month
    if ($dateOption == "current_month")
    {
      $month = date("m");
    }
    // Retrieve month choice
    else if ($dateOption == "other_month")
    {
      if (!getValue($month, "month_choice"))
        return false;
    }
    else
    {
      echo ("[ERROR] validateAddTransfer: Invalid date_option (2)");
      return false;
    }

    $year = date("Y");
    $date = $year . "-" . $month . "-" . $_POST[$label];
    return true;
  }
}


// ---------------------------------------------------------------
// --------------------- validateAddTransfer ---------------------
// ---------------------------------------------------------------

getValue($pseudo, "pseudo");
getValue($transferCount, "transferCount");

if (!$VALID_FORM) return;

$transferSuccess = 0;
for($i = 0; $i < $transferCount; $i++)
{
  if (!getValue($value, "value_" . strval($i)))     break;

  if (!getDateValue($date, "date_" . strval($i)))   break;

  if (!getValue($type, "type_" . strval($i)))       break;

  if (!getValue($comment, "comment_" . strval($i))) break;

  // Special case: checkbox
  $secret = (isset($_POST["secret_" . strval($i)])) ? 1 : 0; 
  if ($secret)
  {
    $perso = true;  // If secret, perso active by default
  }
  else
  {
    $perso = (isset($_POST["perso_" . strval($i)])) ? 1 : 0; 
  }


  // Add transfer into database
  $req = $bdd->exec("INSERT INTO transfer (
    id_user, 
    id_type, 
    value, 
    date, 
    perso, 
    comment,
    secret)
  VALUES (
    (SELECT id_user FROM user WHERE pseudo = '$pseudo'), 
    (SELECT id_type FROM type WHERE label = '$type'), 
    '$value',
    '$date',
    '$perso',
    '$comment',
    '$secret')");

  $transferSuccess++;
}

if ($VALID_FORM && $transferSuccess == $transferCount)
{
  echo "<script type='text/javascript'>alert('" . $transferCount . " virements ajoutés sur le compte de " . $pseudo . ".')</script>";
  echo '<meta http-equiv="refresh" content="0; url=http://localhost:3000/virements">';
}
else if (!$VALID_FORM && $transferSuccess != 0)
{
  echo "<script type='text/javascript'>alert('Erreur Formulaire, seulement " . $transferSuccess . " virements ajoutés.')</script>";
  echo '<meta http-equiv="refresh" content="0; url=http://localhost:3000/virements">';
}
else if (!$VALID_FORM && $transferSuccess == 0)
{
  echo "<script type='text/javascript'>alert('Erreur Formulaire, aucun virement ajouté.')</script>";
  echo '<meta http-equiv="refresh" content="0; url=http://localhost:3000/virements">';
}
else
{
  echo "<script type='text/javascript'>alert('PROBLEME SERVEUR: " . $VALID_FORM . " - " . $transferSuccess . "')</script>";
  echo '<meta http-equiv="refresh" content="0; url=http://localhost:3000/virements">';
}


?>