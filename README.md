# Fruits Memory Game

## Contexte
Dans le cadre d'un challenge O'clock, il fallait réaliser un jeu de mémoire fruité ! MIAM ! 🤤

Ce jeu devait être développé from scratch sans framework et librairie (hormis JQuery pour le Javascript). Il devait intégrer la norme PSR-4. 

Aucune charte graphique n'est imposée pour réaliser l'interface.

## Fonctionnalités
Voici une liste des fonctionnalités requises :
- Au commencement du jeu, des cartes sont disposées face cachée à l'écran.
- Le joueur doit cliquer sur deux cartes. Si celles-ci sont identiques, la paire est validée. Sinon, les cartes sont retournées face cachée, et le joueur doit sélectionner une nouvelle paire de cartes.
- Un compteur de temps, avec une barre de progression, s’affiche en dessous du plateau.
- Le joueur gagne s'il arrive à découvrir toutes les paires avant la fin du temps imparti.
- Chaque temps de partie effectuée doit être sauvegardée en base de données. Avant le début du jeu, les meilleurs temps s’affichent à l’écran.

## Lien vers la demo
Voici à quoi ressemble le jeu une fois déployé, [cliquez-ici](https://memorygame.codgency.tech) pour accéder au serveur de démo.

## Première installation
⚠️ Avant de lire le déploiement classique et pour ceux qui sont interresés, l'application peut être déployé avec Docker. Vous retrouverez les insctructions [ICI](https://github.com/flurryyy/memory_game/blob/main/DOCKER.md)
1. Installer les dépendances PHP avec un `composer install`
2. Créer un fichier .env, il suffit de copier l'exemple avec la commande suivante :
```
cp .env.example .env
```
3. Modifier le fichier d'environnement en fonction du vos informations.
```
DB_HOSTNAME=VOTRE_NOM_D_HOTE
DB_PORT=LE_PORT_MYSQL
DB_USERNAME=VOTRE_UTILISATEUR
DB_PASSWORD=VOTRE_MOT_DE_PASSE
DB_NAME=memory_game
```
4. Une fois le .env correctement rempli, vous pouvez lancer un script prévu pour créer la base de donnée `memory_game` (se lance depuis la racine du projet) :
```
php create_database.php
```
5. Si vous modifier le SCSS, deux commandes sont disponibles :
- `npm run sass` pour compiler le SCSS
- `npm run sass-watch` pour compiler en temp réel pendant les modifications
6. Si vous voulez lancer le projet avec le serveur de développement de PHP faite la commande :
```
php -S localhost:[PORT_QUE_VOUS_VOULEZ] -t public/
```
Exemple : 
```
php -S localhost:8080 -t public/
```
7. Rendez-vous à l'adresse `http://localhost:[LE_PORT_CHOISI]`. Dans notre exemple `http://localhost:8080`
8. Vous pouvez jouer ! Bon jeu !

## Dépendances du projet
- `vlucas/phpdotenv` : Permet de réupérer les variables d'environnements
- `twig/twig` : Moteur de template de Symfony utilisé en mode standalone dans notre projet

## Idée d'amélioration
Voici quelques idées d'améliorations qui pourrait être intéressante si le projet était un peu plus volumineux :
- Utiliser Webpack.
- Mettre en place un système de routing, par exemple intégrer Symfony Routing.
