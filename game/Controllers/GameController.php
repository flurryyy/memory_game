<?php

namespace Game\Controllers;

use Game\Models\Score;
use Game\Services\Twig\TwigService;

class GameController {

    /**
     * Affiche la vue du jeu
     */
    public function view() {
        // On fait appel à notre model pour récupérer les 3 meilleurs scores
        $bestScores = Score::getBestsScores();

        // On affiche la vue grâce à notre moteur de template (Twig) inclus en standalone dans notre projet
        echo (new TwigService())->twig->render('Game/game.html.twig', ['bestScores' => $bestScores ]);
    }

    /**
     * Sauvegarde le score
     * @param $score
     * @return false|string
     */
    public function saveScore($score) {
        $score = date('H:i:s', $score);
        // On construit l'objet grâce à notre méthode constructArray
        $score = (new Score())->constructArray(['score' => $score]);
        // On ajoute la score en BDD
        $score->add();

        // On retourne les meilleurs scores sous forme de json, interprétable facilement par JS
        echo json_encode(['finalScore' => $score]);
    }

    /**
     * Retourne les meilleures scores en JSON
     */
    public function getBestScores() {
        echo json_encode(['bestScores' => Score::getBestsScores()]);
    }
}