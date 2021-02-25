# Déploiement avec Docker
Bienvenue à toi dans la section Docker ! Tu vas pourvoir déployer ce super jeu en un claquement de doigt grâce aux containers !
## Quels sont les fichiers nécessaires à Docker
À la racine du projet tu trouveras différents fichiers (tous commentés pour que tu puisse les comprendre) qui sont nécessaires au fonctionnement de Docker. Les voici :
- `Dockerfile` : Permet d'effectuer le build d'une image (par exemple dans notre cas celle de `php:7.4-apache`
- `docker-compose.yml` : Permet de composer plusieurs services et crée un réseau virtuel entre eux pour qu'ils puissent s'utiliser mutuellement. Par exemple notre projet dépend de php mais aussi de mysql, il faut donc un docker-compose.yml pour définir ces deux services. Vous trouverez toute les explications dans le fichier lui-même.
## Comment faire pour déployer l'application ?
1. On clone ce repo, comme d'habitude.
```
git clone https://github.com/flurryyy/memory_game.git
```
2. On rentre dans le dossier.
```
cd memory_game
```
3. On exécute la commande suivante : 
```
docker-compose up -d
```
Explications : `up` permet de créer et lancer les containers, `-d` ou `--detach` lance les containers en arrière-plan.

4. C'EST TOUT ! Rendez-vous à l'adresse `http://localhost:8080` pour profiter du jeu.

⚠️ PS : Si vous essayez d'aller instantanément sur `http://localhost:8080` vous allez rencontrer une erreur "Connection refused", c'est normal attendez bien quelques secondes de plus que les containers soit bien démarrés et fonctionnels. 

Pour éteindre les service et supprimer les containers fait la commande :
```
docker-compose down -v
```
Explications : `down` permet de stopper et de supprimer les containers, `-v` ou `--volumes` supprimer les volumes déclarer dans la section `volumes` du `docker-compose.yml`.
