<?php

namespace Game\Models;

use Game\Services\Database\DB;

class Score {

    public $id;
    public $score;

    // Nom de la table
    const TABLE_NAME = "scores";

    /**
     * Score constructor.
     * @param null $id
     */
    public function __construct($id = null)
    {
        // Si l'id n'est pas nul alors on continue
        if ($id !== null) {
            // On va aller sélectionner dans la table "scores" la ligne où l'id est égal à l'id renseigné en paramètre
            $champs = DB::select(["*"], self::TABLE_NAME, ["id" => $id]);
            // Si $champs n'est pas vide alors on continue
            if ($champs) {
                // On construit notre objet
                $this->constructArray($champs[0]);
            }
        }
    }

    /**
     * Permet de construire l'objet en fonction des données passées en paramètres
     * @param array $donnees
     * @return $this
     */
    public function constructArray(array $donnees=[]){
        foreach ($donnees as $key => $value) {
            // Si la propriété existe dans notre class
            if (property_exists($this,$key)) {
                // alors on set cette propriété avec la valeur
                $this->$key = $value;
            }
        }
        // On retourne l'objet
        return $this;
    }

    /**
     * Ajoute un nouveau score en BDD
     * @return $this
     */
    public function add()
    {
        // On effectue un insert du score en base de donnée
        $this->id = DB::insert(self::TABLE_NAME, [
            "score" => $this->score,
        ]);

        return $this;
    }

    /**
     * Récupère les 3 meilleurs scores
     * @return mixed
     */
    public static function getBestsScores() {
        // Retourne le résultat d'un select sur la table 'scores' avec une limit de 3 et en triant les score de manière croissant
        return DB::select(['*'], self::TABLE_NAME, ['limit' => 3], ['score' => 'ASC']);
    }
}