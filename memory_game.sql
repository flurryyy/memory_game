--
-- Base de données : `memory_game`
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Création ou réinitialisation de la database
--
DROP DATABASE IF EXISTS memory_game;
CREATE DATABASE IF NOT EXISTS memory_game;
USE memory_game;

--
-- Structure de la table `scores`
--
CREATE TABLE IF NOT EXISTS `scores` (
    `id` int(11) NOT NULL,
    `score` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour la table `scores`
--
ALTER TABLE `scores`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour la table `scores`
--
ALTER TABLE `scores`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;