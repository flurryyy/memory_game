<?php

/**
 * Récupère la valeur d'une variable d'environnement
 * @param $value
 * @return false|mixed
 */
function env($value) {
    // On vérifie que la valeur est bien présente dans les variables d'environnements
    if(isset($_ENV[$value]))
    {
        // Si oui, on la retourne
        return $_ENV[$value];
    }
    // Si non, on retourne false
    return false;
}