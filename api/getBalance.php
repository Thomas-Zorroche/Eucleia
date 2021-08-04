<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');

// Connection file to the database
include("db_connect.php");

// SELECT SUM(CASE WHEN value > 0 THEN value ELSE 0 END) FROM `transfer` WHERE `id_user` = 1


if (isset($_POST["year"]) && isset($_POST["pseudo"]))
{


  $year = $_POST["year"];
  $pseudo = $_POST["pseudo"];
  if (isset($_POST["month"]))
    $month = $_POST["month"];

  $sumIncomes = 0;
  $sumExpanses = 0;

  
  $baseQueryIncomes   = "SELECT SUM(CASE WHEN transfer.value > 0 THEN transfer.value ELSE 0 END) AS value_sum FROM transfer WHERE transfer.id_user = (SELECT id_user FROM user WHERE pseudo = '$pseudo')";
  $baseQueryExpanses  = "SELECT SUM(CASE WHEN transfer.value < 0 THEN transfer.value ELSE 0 END) AS value_sum FROM transfer WHERE transfer.id_user = (SELECT id_user FROM user WHERE pseudo = '$pseudo')";

  $queryParamMonth = " AND MONTH(transfer.date) = :monthValue";
  $queryParamYear  = " AND YEAR(transfer.date) = :yearValue";


  
  if (isset($_POST["month"]))
  {

    $queryIncomes = $bdd->prepare($baseQueryIncomes . $queryParamMonth);
    $queryIncomes->execute(array(
      "monthValue" => $month,
    ));

    $rowIncomes = $queryIncomes->fetch(PDO::FETCH_ASSOC);
    $sumIncomes = $rowIncomes['value_sum'];

    $queryExpanses = $bdd->prepare($baseQueryExpanses . $queryParamMonth);
    $queryExpanses->execute(array(
      "monthValue" => $month,
    ));

    $rowExpanses = $queryExpanses->fetch(PDO::FETCH_ASSOC);
    $sumExpanses = $rowExpanses['value_sum'];
  }
  else
  {
    $queryIncomes = $bdd->prepare($baseQueryIncomes . $queryParamYear);
    $queryIncomes->execute(array(
      "yearValue" => $year,
    ));

    $rowIncomes = $queryIncomes->fetch(PDO::FETCH_ASSOC);
    $sumIncomes = $rowIncomes['value_sum'];

    $queryExpanses = $bdd->prepare($baseQueryExpanses . $queryParamYear);
    $queryExpanses->execute(array(
      "yearValue" => $year,
    ));

    $rowExpanses = $queryExpanses->fetch(PDO::FETCH_ASSOC);
    $sumExpanses = $rowExpanses['value_sum'];
  }

  echo json_encode(array(
    "incomes" => $sumIncomes,
    "expanses" => $sumExpanses,
  ));

}
else
{
  echo json_encode("Problème serveur, invalid url");
  http_response_code(404);
}

?>