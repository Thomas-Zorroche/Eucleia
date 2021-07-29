<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

// Connection file to the database
include("db_connect.php");

if (isset($_POST["dateFilterType"]) && isset($_POST["dateFilterValue"]) && isset($_POST["userCount"]))
{
  $dateFilterType = $_POST["dateFilterType"];
  $dateFilterValue = $_POST["dateFilterValue"];
  $userCount = $_POST["userCount"];


  // Array to return
  $transfers = array();

  // iterate through users
  for ($i = 0; $i < $userCount; $i++)
  {
    if (!isset($_POST["user_" . $i]) || !isset($_POST["userFilter_" . $i])) 
    {
      echo json_encode("Invalid users datas");
      return;
    }

    $pseudo = $_POST["user_" . $i];
    $userFilter = $_POST["userFilter_" . $i];

    if ($userFilter == "None")
    {
      continue;
    }
    else if ($userFilter == "Perso" || $userFilter == "Common")
    {
      $query = $bdd->prepare(
        'SELECT transfer.value, transfer.date, transfer.comment, transfer.perso, transfer.secret, transfer.id, user.pseudo, type.label
          FROM transfer
          INNER JOIN type ON type.id_type = transfer.id_type 
          INNER JOIN user ON user.id_user = transfer.id_user
          WHERE MONTH(transfer.date) = :monthValue AND user.pseudo = :pseudo AND transfer.perso = :perso');
      $query->execute(array(
        'monthValue' => $dateFilterValue,
        'pseudo' => $pseudo, 
        'perso' => $userFilter == "Perso" ? 1 : 0)
      );
    }
    else if ($userFilter == "All")
    {
      $query = $bdd->prepare(
        'SELECT transfer.value, transfer.date, transfer.comment, transfer.perso, transfer.secret, transfer.id, user.pseudo, type.label
          FROM transfer
          INNER JOIN type ON type.id_type = transfer.id_type 
          INNER JOIN user ON user.id_user = transfer.id_user
          WHERE MONTH(transfer.date) = :monthValue AND user.pseudo = :pseudo');
      $query->execute(array(
        'monthValue' => $dateFilterValue,
        'pseudo' => $pseudo)
      );
    }
    else
    {
      echo json_encode("Invalid user filter.");
      return;
    }



    while($resultats = $query->fetch())
    {
      $transfer = array(
        "id" => $resultats['id'],
        "user" => $resultats['pseudo'],
        "value" => $resultats['value'],
        "type" => $resultats['label'],
        "date" => $resultats['date'],
        "perso" => $resultats['perso'],
        "secret" => $resultats['secret'],
        "comment" => $resultats['comment']
      );
      array_push($transfers, $transfer);
    }

  }
  

	echo json_encode($transfers);

}
else
{
  echo json_encode("Problème serveur, invalid url");
  http_response_code(404);
}


?>