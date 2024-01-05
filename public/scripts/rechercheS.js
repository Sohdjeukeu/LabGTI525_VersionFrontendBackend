// Source: https://www.w3schools.com/howto/howto_js_filter_table.asp
const inputSearch = document.getElementById("searchBar");
const inputDate = document.getElementById("date");

// File deprecated

// function recherche() {
//     const filter = inputSearch.value.toUpperCase();
//     const tr = table.getElementsByTagName("tr");
//     const table = document.querySelector('table');

//     // Boucle à travers toutes les lignes de la table, 
//     // et cache celles qui ne correspondent pas à la recherche
//     let td, i, txtValue;
//     for (i = 0; i < tr.length; i++) {
//         td = tr[i].getElementsByTagName("td")[1];
//         if (td) {
//             txtValue = td.textContent;
//             if (txtValue.toUpperCase().indexOf(filter) > -1) {
//                 tr[i].style.display = "";
//             } else {
//                 tr[i].style.display = "none";
//             }
//         }
//     }
// }

// function date() {
//     console.log("lol");
// }

// Source: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

// Execute a function when the user presses a key on the keyboard
inputSearch.addEventListener("keypress", (event) => {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        fetch('/gti525/v1/compteurs?nom='+inputSearch.value).then(response => response.json())
        .then(data => {     
            console.log(data.resultats);
            ///location.reload();
        })
        // Trigger the button element with a click
        document.getElementById("searchBtn").click();
    }
});

inputDate.addEventListener("keypress", (event) => {
    const table = document.getElementById('donnees');
    if (event.key === "Enter") {
        if (inputDate.value) {
            // Effectuez une requête Fetch vers votre API
            fetch(`/gti525/v1/compteurs?implantation=${inputDate.value}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.resultats);
                    // Effacez le contenu actuel de la table
                    table.innerHTML = '';

                    // Mettez à jour la table avec les nouvelles données
                    data.resultats.forEach(unCompteur => {
                        const ID = unCompteur.ID;
                        const Nom = unCompteur.Nom;
                        const Statut = unCompteur.Statut;
                        const Annee_implante = unCompteur.Annee_implante;
                        const tableRow = document.createElement('tr');
                        
                        // Les colonnes qu'on veut afficher
                        const fieldToDisplay = [ID, Nom, Statut, Annee_implante];
                        // Ajoutez des cellules pour chaque propriété de l'objet
                        colsAAfficher(fieldToDisplay, tableRow, table);
                        accesModal(fieldToDisplay, tableRow);
                    });
                })
                .catch(error => {
                    console.error('Erreur lors de la requête fetch :', error);
                });
        } else {
            // Si aucune date n'est sélectionnée, effacez le contenu de la table
            table.innerHTML = ''
            readDATA()
        }
    }
});
