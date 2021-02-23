<?php

namespace Game\Services\Database;

use Exception;
use PDO;
use PDOException;

/**
 * Couche d'abstraction vers le QueryBuilder
 * Class DB
 * @package Game\Services\Database
 */
class DB {

    protected static $bdd;

    /**
     * Retourne l'instance PDO
     * @return PDO
     * @throws Exception
     */
    public static function get(){
        if(!static::$bdd){
            // On crée la nouvelle instance PDO
            try {
                static::$bdd = new PDO('mysql:host='.env('DB_HOSTNAME').':'.env('DB_PORT').';dbname='.env('DB_NAME').';charset=utf8mb4', env('DB_USERNAME'), env('DB_PASSWORD'));
                static::$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                static::$bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

            } catch (PDOException $e) {
                throw new Exception($e->getMessage(), 400);
            }
            // On retourne l'instance nouvellement créée
            return static::$bdd;
        }else{
            return static::$bdd;
        }
    }

    /**
     * Appel le Query Builder pour faire un insert
     * @param $table : the table to insert in
     * @param $array : key-values pairs to insert
     * @return int inserted id
     */
    public static function insert($table, $array){
        // Appel du QueryBuilder pour effectuer l'insertion
        $query = new QueryBuilder();
        return $query->insert($table, $array);
    }

    /**
     * Appel du QueryBuilder pour faire un select
     * @param $champs
     * @param $table
     * @param array $conditions
     * @param array $order
     * @return mixed
     */
    public static function select($champs, $table, $conditions = [], $order = []){
        // Appel du QueryBuilder pour effectuer le select
        $qb = new QueryBuilder();
        return $qb->select($champs, $table, $conditions, $order);
    }
}
