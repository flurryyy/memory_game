// Initialisation du compteur de clic
let clic = 0;
// Nombre de cartes dans notre jeu
let nbCards = 36;
// Initialisation de notre "mémoire tampon" qui conserve l'id du premier fruit sélectionné
let firstCardSelected = "";
// On défini notre tableau de fruits dans l'ordre de l'image cards.png
let fruits = ['red-apple', 'banana', 'orangefruit', 'green-lemon', 'pomegranate', 'apricot', 'yellow-lemon', 'strawberry', 'green-apple', 'peach', 'green-grape', 'watermelon', 'plumfruit', 'orange-pear', 'cherry', 'raspberry', 'mango', 'yellow-cherry'];

/**
 * Sélectionne un fruit et ajoute les bonnes classes
 */
function select(id, fruitId) {
    // On sélectionne notre carte et on l'assigne à une variable, ce sera plus simple pour la suite
    let card = $('.game-card[data-id='+id+']');

    // Sécurité en haut de la fonction, elle permet de stopper l'exécution de la fonction au cas où
    // le nombre de clic est égale à 2 ou si la carte est déjà sélectionnée/confirmée
    // Mais aussi le le plateau de jeu est flouté, il ne faudrai pas que l'on puisse tricher lorsque l'on est
    // sur le menu :O
    if (clic === 3 || card.hasClass('selected') || card.hasClass('confirmed') || $('#game-grid').hasClass('blur')) {
        return;
    }

    // Incrémentation de notre compteur de clic
    clic++;

    // On sélectionne la div qui a la class "game-card" et le data attribute data-id égale à l'id
    // transmis à la fonction. On lui ajoute la class "selected" et la class du fruit correspondant.
    // Le fruitId est transmis à la fonction depuis le onclick et contient la position (index) du fruit
    // dans le tableau défini ci-dessus.
    card.addClass('selected '+fruits[fruitId]);

    // Si c'est notre premier clic
    if (clic === 1) {
        // On set la variable firstCardSelected avec l'id du fruit sélectionné
        // Cela permet de garder en mémoire notre premier fruit sélectionné
        firstCardSelected = fruitId;
    }
    // Si c'est notre deuxème clic
    if (clic === 2) {
        // On incrémente la compteur de clic pour bloquer l'exécution du script grace à notre sécurité
        // en début de fonction.
        clic++;
        // On effectue la comparaison entre la première carte sélectionné et la deuxième
        // La comparaison se fait sur l'id du fuit, je n'initialise donc pas une autre variable pour
        // la deuxième carte. Je passe directement l'id en second argument de la fonction.
        // Pour comparer les cartes, au lieu d'utiliser une variable intermédiaire on aurait pu simplement
        // récupérer les éléments avec les class "game-card" et "selected" pour comparer leurs data-fruit
        compareCard(firstCardSelected, fruitId)
    }
}

/**
 * Compare deux cartes entre elle grâce à l'id du fruit
 */
function compareCard(first, second) {
    // On assigne un boolean sur la variable check, on saura directement si la première carte
    // est égale à la seconde
    let check = first === second;
    // Si le check est passé
    if (check === true) {
        // On ajoute une class 'confirmed' sur les cartes correctement trouvées, on en profite pour enlever
        // la class 'selected' qui ne sert plus
        $('.game-card[data-fruit='+first+']').removeClass('selected').addClass('confirmed');
        $('.game-card[data-fruit='+second+']').removeClass('selected').addClass('confirmed');
        // On remet le clic à zéro sinon on ne pourra plus cliquer sur des cartes
        clic = 0;
        // On check le nombre de cartes confirmé pour arrêté le jeu lorsque les 36 seront retournés
        checkNbConfirmedCards();
    } else {
        // On met un timer d'une seconde pour le reset (1000 = 1 seconde)
        // Cela permet à l'utilisateur de mémoriser la deuxième carte sur laquelle il a cliqué
        // Sans ce timeout il ne pourrait même pas voir sa carte tellement l'exécution est rapide
        setTimeout(function() {
            resetCards(first, second);
        }, 1000);
    }
}

/**
 * Permet de reset une paire de cartes
 */
function resetCards(first, second) {
    // On enlève la class 'selected' car la carte est désormais désélectionnée.
    // On enlève aussi la classe correspondant au fruit
    $('.game-card[data-fruit='+first+']').removeClass('selected '+fruits[first]);
    $('.game-card[data-fruit='+second+']').removeClass('selected '+fruits[second]);
    // On remet le clic à zéro sinon on ne pourra plus cliquer sur des cartes
    clic = 0;
}

/**
 * Check le nombre de carte actuellement confirmées
 */
function checkNbConfirmedCards() {
    // Si le nombre de cartes confirmées est égale à nbCard (notre variable qui renseigne le nombre totale de cartes)
    if ($('.game-card.confirmed').length === nbCards) {
        // Alors on fini la partie. Pareil ici, le timeout sert à ce que le joueur puisse voir sa dernière
        // carte jouée se retourner. Une demi seconde suffira largement (500 = 0.5 seconde).
        setTimeout(function () {
            finishGame('win')
        }, 500);
    }
}