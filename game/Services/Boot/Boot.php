<?php

namespace Game\Services\Boot;

use Dotenv\Dotenv;

class Boot {

    /**
     * Charge les variables d'environnements présentes dans le .env
     */
    public static function loadEnvironment() {
        // Si le fichier .env existe bien alors on continue
        if(file_exists(__DIR__ . '/../../../.env')){
            // On définie le repository pour Dotenv, celà va lui permettre de localiser le .env sans encombre
            // Cette fonction crée aussi une nouvelle instance de Dotenv
            $dotenv = Dotenv::createImmutable(__DIR__ . '/../../../');
            // load() permet de lire et de charger les variables d'environnements présentes dans notre .env
            $dotenv->load();
        }
    }
}