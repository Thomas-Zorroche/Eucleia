<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

// Connect to database
include("db_connect.php");
$request_method = $_SERVER["REQUEST_METHOD"];

function getDates($bdd)
{
	$query = $bdd->query('SELECT transfer.date FROM transfer');
	$response = array();
	while($resultats = $query->fetch())
	{
		array_push($response, $resultats['date']);
	}

	echo json_encode($response);
}

function getValues($bdd)
{
	$query = $bdd->query('SELECT value FROM transfer');
	$response = array();
	while($resultats = $query->fetch())
	{
		array_push($response, $resultats['value']);
	}

	echo json_encode($response);
}

function getTransfers($bdd)
{
	$query = $bdd->query(
		'SELECT transfer.value,transfer.date, transfer.comment, transfer.perso, transfer.id, user.pseudo, type.label
			FROM transfer
			INNER JOIN type ON type.id_type = transfer.id_type 
			INNER JOIN user ON user.id_user = transfer.id_user');
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
			"comment" => $resultats['comment']
		);
		array_push($response, $transfer);
	}

	echo json_encode($response);
}

// MAIN --------------------------------

switch($request_method)
{
	
	case 'GET':
		if (!empty($_GET["q"]))
		{
			$q = $_GET["q"];
			switch ($q)
			{
				case 'values':
					getValues($bdd);
					break;
				case 'dates':
					getDates($bdd);
					break;
				case 'transfers':
					getTransfers($bdd);
					break;
			}
		}
		else
		{
			header("HTTP/1.0 405 Method Not Allowed GET");
		}
		break;

	default:
		// Invalid Request Method
		header("HTTP/1.0 405 Method Not Allowed");
		break;
		
	case 'POST':
		break;
		
	case 'PUT':
		break;
		
	case 'DELETE':
		break;

}
?>