<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

// Connection file to the database
include("db_connect.php");



if (isset($_POST["year"]) && isset($_POST["userCount"]) && isset($_POST["showExpanses"]))
{
  $userCount = $_POST["userCount"];
  $showExpanses = $_POST["showExpanses"] == '1' ? true : false;

  // Commun Parameters
  $params = array();
  $params["yearValue"] = $_POST["year"];
  if (isset($_POST["month"]))
    $params["monthValue"] = $_POST["month"];
  
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
    
    $userFilter = $_POST["userFilter_" . $i]; // None, Perso, Common, All
    if ($userFilter == "None")
      continue;
      
    // User Params
    $params["pseudo"] = $_POST["user_" . $i];
    if ($userFilter != "All")
      $params["perso"] = ($userFilter == "Perso") ? 1 : 0;

    // Base Query
    $baseQuery = "SELECT transfer.value, transfer.date, transfer.comment, transfer.perso, transfer.secret, transfer.id, user.pseudo, type.label, type.color
                  FROM transfer
                  INNER JOIN type ON type.id_type = transfer.id_type 
                  INNER JOIN user ON user.id_user = transfer.id_user";
    
    // Query String Parameters 
    $queryParamPerso = " AND transfer.perso = :perso";
    $queryParamMonth = " AND MONTH(transfer.date) = :monthValue";
    $queryParamYear  = " AND YEAR(transfer.date) = :yearValue";
    $queryExpenses   = " AND transfer.value < 0";
    $queryIncomes    = " AND transfer.value > 0";

    // Build Where Clause
    $whereClause = " WHERE user.pseudo = :pseudo";

    $whereClause .= $showExpanses == "1" ? $queryExpenses : $queryIncomes;

    if (array_key_exists("monthValue", $params))
      $whereClause .=  $queryParamMonth;

    if ($userFilter == "Perso")
      $baseQuery .= $queryParamYear . $queryParamPerso;

    else if ($userFilter == "Common")
      $baseQuery .= $queryParamYear . $queryParamPerso;

    else if ($userFilter == "All")
      $baseQuery .= $queryParamYear;
    else
    {
      echo json_encode("Invalid user filter.");
      return;
    }

    $query = $bdd->prepare($baseQuery . $whereClause);
    $query->execute($params);
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
        "comment" => $resultats['comment'],
        "color" => $resultats['color']
      );
      array_push($transfers, $transfer);
    }

    // Clear user params key for the next user
    unset($params["pseudo"]);
    unset($params["perso"]);


  } // End For Loop

  // Return results
	echo json_encode($transfers);

}
else
{
  echo json_encode("Problème serveur, invalid url");
  http_response_code(404);
}


?>