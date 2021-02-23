let sec = 0; // Le nombre de secondes écoulées
let maxTime = 240; // Le maximum de temps que l'on donne au joueur (en secondes) => Par défaut 4 minutes
let int = null; // On initalise la variable qui prendra notre interval, cela permettra de le clear (le stopper et le remettre à 0)

/**
 * Démarre le timer
 */
function startTimer(level) {
    // En fonction du niveau choisi on aura pas le même temps pour trouver toute les paires
    switch (level) {
        case 'easy':
            maxTime = 300; // Facile => 5 minutes (300 secondes)
            break;
        case 'medium':
            maxTime = 180; // Moyen => 3 minutes (180 secondes)
            break;
        case 'hard':
            maxTime = 90; // Difficile => 1 minute 30 (90 secondes)
            break;
    }
    // On change la valeur max de notre barre de progression par notre temps maximum imparti, pas besoin de
    // calculer de pourcentage comme ça
    $('#progress').attr('max', maxTime);
    // On initialise un timer textuel
    $('#timer').text('(0/'+maxTime+' secondes)');

    // On lance la progress bar avec un interval de 1 seconde. Cette fonction JS permet d'effectuer une action
    // tout les x millisecondes. Ici 1000 = 1 seconde => parfait pour notre timer.
    int = setInterval(function() {
        progress();
    }, 1000);
}

/**
 * Gère la progression de la barre
 */
function progress() {
    // On commence par vérifier si le temps n'est pas écoulé donc si la seconde en cours est égale à notre temps
    // maximal imparti
    if (sec === maxTime) {
        // Si c'est le cas on fini le jeu en tant que perdu
        finishGame('lose');
        // On reset notre compteur de secondes à 0
        sec = 0;
    } else {
        // Sinon c'est que le jeu continue, donc on incrémente le compteur de secondes
        sec++;
        // On fait avancer la progress bar en lui affectant le nombre de secondes écoulées
        $('#progress').val(sec);
        // On met à jour notre timer textuel
        $('#timer').text('('+sec+'/'+maxTime+' secondes)');
    }
}

/**
 * Reset les secondes à 0
 */
function resetSecond() {
    sec = 0;
}

/**
 * Getter pour les secondes
 */
function getSecond() {
    return sec;
}

/**
 * Getter pour l'interval
 */
function getInterval() {
    return int;
}