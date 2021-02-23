<?php

namespace Game\Services\Database;

class QueryBuilder {

    /**
     * Fait un select simple en base de donnée
     * @param $champs
     * @param $table
     * @param array $conditions
     * @param array $orders
     * @return array
     */
    public function select($champs, $table, $conditions = [], $orders = []) {
        if(isset($conditions['limit'])){
            $limit = $conditions['limit'];
            unset($conditions['limit']);
        }

        // Formatage de la requête SQL
        $sql = "SELECT ".implode(', ', $champs)." FROM " . $table;

        // On ajoute à la requête le WHERE et les params
        if (!empty($conditions)){
            $sql.=" WHERE ";
            $sql.=implode(" AND ",array_map(function($key,$value){return $value===null?null:$key."=:".$key;}, array_keys($conditions), $conditions));
        }

        // On ajoute les ORDER BY
        if (sizeof($orders) > 0) {
            $sql.=" ORDER BY ";
            $sql.=implode(", ", array_map(function($key,$value){return $key." ".$value;}, array_keys($orders), $orders));
        }

        // On fini par ajouter une limite si elle est renseignée
        if($limit) {
            $sql.=" LIMIT ".$limit;
        }

        // Préparation et exécution de la requête
        $query = DB::get()->prepare($sql);

        // Pour chaque condition on bind la value
        foreach ($conditions as $key => $value) {
            if($value!==null) {
                $query->bindValue(':'.$key, $value);
            }
        }

        $query->execute();

        // On retourne les résultats de la requête
        return $query->fetchAll();
    }

    /**
     * Fait un insert simple en base de donnée
     * @param $table
     * @param $array
     * @return string
     */
    public function insert($table, $array) {
        // On formate la requête SQL
        $sql = "INSERT INTO ".$table." SET ";

        // On ajoute les params à insérer dans la bdd dans la requête
        $array = array_filter($array, function ($value){return $value!==null;});
        $sql.=implode(",",array_map(function($key,$value){return $value===null?null:$key."=:".$key;}, array_keys($array), $array));

        // On prépare la requête
        $query = DB::get()->prepare($sql);

        // On bind les values (on attribue une valeur à chaque paramètre de la requête SQL)
        foreach($array as $key => $value){
            if($value!==null) {
                $query->bindValue(':'.$key, $value);
            }
        }

        // On exécute la requête
        $query->execute();

        // Pour finir, on retourne l'id
        return DB::get()->lastInsertId();
    }
}