<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

// Connection file to the database
include("db_connect.php");


if (isset($_POST["getTypes"]))
{
	$query = $bdd->query("SELECT type.label, type.color, type.id_type FROM type");

  $response = array();
	while($resultats = $query->fetch())
	{
		array_push($response, array(
      "label" => $resultats['label'],
      "color" => $resultats['color'],
      "id" => $resultats['id_type'],
    ));
	}

	echo json_encode($response);

}
else if (isset($_POST["typeCount"]))
{
  for ($i = 0; $i < $_POST["typeCount"]; $i++)
  {
    $label = $_POST["label_" . $i];
    $color = $_POST["color_" . $i];
    $id = $_POST["id_" . $i];
    
    // ADD
    if ($id == -1)
    {
      $req = $bdd->exec("INSERT INTO type (label, color) VALUES ('$label','$color')");
    }
    // UPDATE
    else
    {
      $req = $bdd->prepare('UPDATE type SET label = :label, color = :color WHERE id_type = :id');
      $req->execute(array(
        'label' => $label,
        'color' => $color,
        'id' => $id
      ));
    }

  }

  echo json_encode('success');

}
else
{
  echo("Problème serveur");
  http_response_code(404);
}








?>