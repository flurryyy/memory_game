/**
 * Lance la requête Ajax pour sauvegarder le score en BDD
 */
function saveScore() {
    // Requête Ajax vers index.php
    $.ajax({
        url: "index.php",
        // Méthode souhaitée => Comme vu dans notre index.php, il nous faut une méthode POST
        method: "POST",
        // Données envoyées dans la requête
        data: {
            action: 'saveScore',
            score: getSecond()
        },
    }).done(function(response) {
        // Si la requête est bien passée
        // On récupère les données sous forme de JSON
        let datas = $.parseJSON(response);
        // On affiche le score final de la partie
        showFinalScore(datas.finalScore.score);
    }).fail(function( jqXHR, textStatus ) {
        // Si elle fail alors on affiche une alert avec l'erreur
        alert('Error : '+textStatus)
    });
}

/**
 * Récupère les meilleurs scores avec une requête Ajax et les mets à jour
 */
function updateBestScores() {
    // Requête Ajax vers index.php
    $.ajax({
        url: "index.php",
        method: "POST",
        data: {
            action: 'getBestScores'
        },
    }).done(function(response) {
        // On récupère les données sous forme de JSON
        let datas = $.parseJSON(response);
        // On met à jour les meilleurs scores
        formatBestScore(datas.bestScores);
    }).fail(function( jqXHR, textStatus ) {
        alert('Error : '+textStatus)
    });
}

/**
 * Affiche notre score dans le menu lorsque l'on gagne
 */
function showFinalScore(score) {
    // Ajoute le score dans la div avec l'id "score"
    $('#score').text('Votre score : '+formatScore(score));
}

/**
 * Met à jour le DOM avec les nouveaux meilleurs scores
 */
function formatBestScore(bestScores) {
    // On initialise la variable en sélectionnant notre div avec l'id "bestScores"
    let bestScoresDiv = $('#bestScores');
    // On vide la div
    bestScoresDiv.empty();

    // Pour chaque bestScores (il y en a 3 maximum)
    bestScores.forEach(function (item, index) {
        // On incrémente l'index car à la première itération il vaut 0 et on souhaite l'affiché pour le
        // tableau des scores. Un tableau des scores commence toujours pas le chiffre 1 et pas 0.
        index++;
        // On ajoute à notre div le meilleur score
        bestScoresDiv.append("<p>"+index+") "+formatScore(item.score));
    })
}

/**
 * Retourne le score sous le bon format prêt à être affiché
 */
function formatScore(score) {
    // Le score arrive sous ce format depuis la BDD => hh:mm:ss
    // On effectue un split sur notre chaîne avec le séparateur ':'
    // Cela nous permet de récupérer l'index 1 qui sera les minutes et le 2 qui sera les secondes
    return score.split(':')[1]+" minute(s) et "+score.split(':')[2]+" seconde(s)";
}