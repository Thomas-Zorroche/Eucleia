<?php
    try
    {
        $bdd = new PDO('mysql:host=localhost;dbname=eucleia;', 'root', '');
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch (PDOException $e) {
        echo "DataBase Error: <br>".$e->getMessage();
    }
    catch(Exception $e)
    {
        die('Erreur SQL : '.$e->getMessage());
    }
?>