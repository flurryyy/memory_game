/**
 * Notre fonction principale, elle permet de lancer le jeu et réagit au bouton
 */
function launchGame(level) {
    // On rendomize les cartes en premier, même si c'est instantannée, il est préférable de les
    // mélanger avant d'enlever le menu
    randomizeCards();
    // On cache le menu pour que l'utilisateur puisse profiter de notre jeu :)
    hideMenu();
    // On démarre le timer, on lui transmet le niveau car c'est lui qui gère le temps imparti
    startTimer(level);
}

/**
 * Mélange notre jeu de carte
 */
function randomizeCards() {
    // On selectionne la grille de jeu
    var grid = $("#game-grid");
    // On récupère les enfants de la grille => Ce sont nos cartes
    var cards = grid.children();
    // On remet chaque carte dans la grille mais dans un ordre aléatoire
    while (cards.length) {
        grid.append(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
    }
}

/**
 * Cache le menu principal du jeu
 */
function hideMenu() {
    // Cache la div avec l'id "infos" (Cache le menu)
    $("#infos").hide();
    // Enlève la class "blur" sur la div avec l'id "game-grid" (Défloute l'arrière plan)
    $("#game-grid").removeClass("blur");
}

/**
 * Affiche le menu principal du jeu
 */
function showMenu() {
    // Affiche la div avec l'id "infos" (Affiche le menu)
    $("#infos").show();
    // Ajoute la class "blur" sur la div avec l'id "game-grid" (On floute l'arrière plan)
    $("#game-grid").addClass("blur");
}

/**
 * Permet de finir le jeu
 */
function finishGame(type) {
    // On clear l'intervalle, c'est très important. Il doit être remis à zéro sinon il continue de tourner
    // en arrière plan.
    clearInterval(getInterval());
    // On ré-affiche le menu principal
    showMenu();
    // On reset le plateau de jeu
    resetGameBoard();
    // En fonction du type de fin de jeu : win (gagner), lose (perdu) on affiche pas la même alert
    // On utilise donc un switch pour évaluer quelle valeur est contenu dans la variable 'type'
    switch (type) {
        case 'win':
            // On sauvegarde le score
            saveScore();
            // Ce n'est pas le timer arrête la partie quand on gagne, on doit donc réinitialiser le nombre
            // de secondes écoulées
            resetSecond();
            alert('Tu as gagnééééééééé !')
            break;
        case 'lose':
            alert('Tu as perdu :( Retentes ta chance..')
            break;
    }
    // On fini par mettre à jour les meilleurs scores
    updateBestScores();
}

/**
 * Réinitialise de plateau de jeu
 */
function resetGameBoard() {
    // Enlève toute les class des cartes et remet la class principale "game-card"
    $(".game-card").removeClass().addClass("game-card");
    // Remet la barre de progression à zéro
    $("#progress").val(0);
    // Efface notre timer textuel
    $("#timer").empty();
    // Re-mélange les cartes
    randomizeCards();
}