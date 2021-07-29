<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

// Connection file to the database
include("db_connect.php");

if (isset($_POST["dateFilterType"]) && isset($_POST["dateFilterValue"]))
{
  $dateFilterType = $_POST["dateFilterType"];
  $dateFilterValue = $_POST["dateFilterValue"];

  // if ($dateFilterType == "Month") // 7
  // {
  //   $date = "2021-" . $dateFilterType . ;
  // }
  // else if ($dateFilterType == "Year") //2021
  // {

  // }
  // else
  // {
  //   echo("Invalid date filter type: " . $dateFilterType);
  //   http_response_code(404);
  // }

  // date format: YYYY-MM-DD

  $query = $bdd->prepare(
		'SELECT transfer.value, transfer.date, transfer.comment, transfer.perso, transfer.secret, transfer.id, user.pseudo, type.label
			FROM transfer
			INNER JOIN type ON type.id_type = transfer.id_type 
			INNER JOIN user ON user.id_user = transfer.id_user
      WHERE MONTH(transfer.date) = :monthValue');
  $query->execute(array(
    'monthValue' => $dateFilterValue)
  );
	$response = array();
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
		array_push($response, $transfer);
	}

	echo json_encode($response);
}
else
{
  echo json_encode("Problème serveur");
  http_response_code(404);
}


?>