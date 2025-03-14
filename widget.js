(function() {
    const dscc = require('@google/dscc');

    // Définition des dimensions du widget
    const WIDTH = 50;
    const HEIGHT = 50;
    
    // Fonction pour dessiner le rond
    function drawViz(data) {
        const container = document.getElementById("widget");
        container.innerHTML = ""; // Nettoyer le widget avant chaque mise à jour

        // Récupération de la valeur à partir des données Looker Studio
        const value = data.tables.DEFAULT[0].metrics[0].value;

        // Définir la plage de clignotement (ex: entre 50 et 100)
        const minRange = 50;
        const maxRange = 400;
        const shouldBlink = value >= minRange && value <= maxRange;

        // Création du rond
        const circle = document.createElement("div");
        circle.style.width = "20px";
        circle.style.height = "20px";
        circle.style.borderRadius = "50%";
        circle.style.backgroundColor = "red";
        circle.style.margin = "auto";

        // Ajout d'une animation si nécessaire
        if (shouldBlink) {
            circle.style.animation = "blink 1s infinite";
        }

        // Ajout du style de clignotement
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0; }
                100% { opacity: 1; }
            }
        `;

        // Ajout des éléments au conteneur
        container.appendChild(style);
        container.appendChild(circle);
    }

    // Abonnement aux données de Looker Studio
    dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });

})();
