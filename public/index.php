<?php

// Récupération de l'autoload de composer (PSR-4)
require __DIR__ . '/../vendor/autoload.php';
// On récupère le bootstrap de notre application PHP
require __DIR__ . '/../game/bootstrap.php';

use Game\Controllers\GameController;

// On crée un instance de notre game controller
$game = new GameController();

// Si la méthode HTTP est en POST et que la requête contient bien une data "action" étant égale à "saveScore"
// alors on sauvegarde le score. Petit hack pour pouvoir intercepter la requête AJAX sans faire un routeur complet
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == "saveScore") {
    $game->saveScore($_POST['score']);
}
// Idem que ci-dessus, il faut que la requête soit en POST et que une donnée "action" soit fournie et soit égale
// à "getBestScores"
elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == "getBestScores") {
    $game->getBestScores();
} else {
    // Sinon on affiche la vue classique
    $game->view();
}