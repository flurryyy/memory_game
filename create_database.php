<?php

// Récupération de l'autoload de composer (PSR-4)
require __DIR__ . '/vendor/autoload.php';
// On récupère le bootstrap de notre application PHP
require __DIR__ . '/game/bootstrap.php';

error_log("Création de la base de donnée...");

$sql = file_get_contents(__DIR__ . '/memory_game.sql');

try {
    $bdd = new PDO('mysql:host='.env('DB_HOSTNAME').':'.env('DB_PORT'), env('DB_USERNAME'), env('DB_PASSWORD'));
} catch (PDOException $e) {
    throw new Exception($e->getMessage(), 400);
}

$bdd->query($sql);

error_log("Base de donnée créée !");