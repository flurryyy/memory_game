# Un dockerfile permet de configurer une image comme on le souhaite. En effet, on peut exécuter les actions que l'on veux.
# Depuis l'image php7.4 apache
FROM php:7.4-apache
# On copie notre virtualhost à la place de l'ancien (ils portent tous les deux le même nom => 000-default.conf)
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf
# On installer l'extension pdo_mysql pour PHP
RUN docker-php-ext-install pdo_mysql
# On installe git et unzip zip => Composer en a besoin
RUN apt-get update && apt-get -y install \
    git \
    unzip zip
# On copie tout notre projet dans le répertoire /var/www/html
COPY . /var/www/html
# On défini le chemin sur lequel on souhaite exécuter les commandes suivantes
WORKDIR /var/www/html
# On télécharge composer et on le rend disponible en global
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# On fait notre composer install pour installer nos dépendances PHP
RUN composer install
# On remplace/crée notre .env grace à notre .env.docker
RUN mv .env.docker .env