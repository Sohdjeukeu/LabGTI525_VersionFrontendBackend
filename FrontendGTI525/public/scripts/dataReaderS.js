import { updateChart } from './histogramme.js'
function readCSV() {
    let activeMarker = null;

    // Source: https://www.iconsdb.com/soylent-red-icons/map-marker-2-icon.html
    const clickedIcon = L.icon({
        iconUrl: '/images/marqueurs/greenIcon.png',
        iconSize: [35, 35],
        popupAnchor: [1, -20],
    });

    const normalIcon = L.icon({
        iconUrl: '/images/marqueurs/redIcon.png',
        iconSize: [35, 35],
        popupAnchor: [1, -20],
    });
    fetch('/data/compteurs.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n').slice(1); // Ignorer la première ligne (header)
            const tableBody = document.getElementById('donnees');

            let map = L.map('map').setView([45.551814, -73.654465], 11);
            L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
                maxZoom: 20,
                ext: 'png'
            }).addTo(map);
            rows.forEach(row => {
                const cols = row.split(',');
                const tableRow = document.createElement('tr');
                // document.querySelectorAll('tr:nth-child(even)').forEach((evenRow) => { evenRow.style.backgroundColor = 'grey'; });
                // Les colonnes qu'on veut afficher
                const colsToDisplay = [0, 2, 3, 6];

                const lat = parseFloat(cols[4]); // Colonne 4 pour la latitude
                const lon = parseFloat(cols[5]); // Colonne 5 pour la longitude

                // Vérifie que les valeurs de lat et lon ne sont pas NaN
                if (!isNaN(lat) && !isNaN(lon)) {
                    const marker = L.marker([lat, lon], { icon: normalIcon }).addTo(map);
                    marker.bindPopup(`${cols[2]}`);
                    marker.on('click', () => {
                        // Réinitialise le style du marqueur précédent
                        if (activeMarker) {
                            activeMarker.setIcon(normalIcon);
                        }
                        // Style du marqueur actuel
                        marker.setIcon(clickedIcon);
                        activeMarker = marker;
                    });
                }
                colsAAfficher(colsToDisplay, cols, tableRow, tableBody);
                accesModal(cols, tableRow);
            });
        })
        .catch(error => console.error("Une erreur s'est produite :", error));
}
readCSV();

function colsAAfficher(colsToDisplay, cols, tableRow, tableBody) {
    colsToDisplay.forEach(index => {
        const tableCell = document.createElement('td');
        tableCell.textContent = cols[index];
        tableRow.appendChild(tableCell);
    });
    tableBody.appendChild(tableRow);
}

function accesModal(cols, tableRow) {
    const actionCell = document.createElement('td');
    const button = document.createElement('button');
    button.innerHTML = '<i class="material-symbols-outlined">equalizer</i>Passages';
    button.addEventListener('click', () => {
        openModal(cols);
    });
    actionCell.appendChild(button);
    tableRow.appendChild(actionCell);
}

function openModal(cols) {
    const modal = document.getElementById('myModal');
    let passages = [];
    let periode = [];

    const heading = document.querySelector(".modal-header h1");
    heading.innerHTML = `Statistiques des passages: ${cols[2]} | ${cols[0]}`;

    // const modalHTML = modalWindow(cols);
    // console.log(modalHTML);
    // const modalHTML = `
    // <div class="modal-header">
    //     <span class="close">&times;</span>
    //     <h1>Statistiques des passages: ${cols[2]} | ${cols[0]}</h1>
    // </div>
    // <div class="modal-body">
    //     <div class="graphe">
    //         <canvas id="barCanvas" aria-label="chart" role="histogramme"></canvas>
    //     </div>
    //     <section class="coteDroit">
    //         <div class="periode">
    //             <h3>Période</h3>
    //             <div>
    //                 <label>
    //                     <span>De:</span><input type="date" id="debut" placeholder="Choisir la date" type="text" onfocus="this.type='date'" required>
    //                 </label><br>
    //                 <label id="a">
    //                     <span>À:</span><input type="date" id="fin" placeholder="Choisir la date" type="text" onfocus="this.type='date'" required>
    //                 </label>
    //             </div>
    //         </div>
    //         <div class="largeur">
    //             <h3>Largeur d'intervalle:</h3>
    //             <div>
    //                 <label><input type="radio" id="jour"    name="intervalle" value="jour" checked>Jour    </label><br>
    //                 <label><input type="radio" id="semaine" name="intervalle" value="semaine"     >Semaine </label><br>
    //                 <label><input type="radio" id="mois"    name="intervalle" value="mois"        >Mois    </label>
    //             </div>
    //         </div>
    //     </section>
    // </div>
    // <div class="modal-footer">
    //     <a id="fermer">Fermer</a>
    // </div>
    // `;
    // modalContent.innerHTML = modalHTML;
    
    // Ajoutez des écouteurs d'événements pour les changements d'input date de début et de fin
    // document.getElementById('debut').addEventListener('change', updateChartWithDateRange);
    // document.getElementById('fin').addEventListener('change', updateChartWithDateRange);

    // function updateChartWithDateRange() {
    //     // Récupérez les dates de début et de fin depuis les inputs
    //     const dateDebut = document.getElementById('debut').value;
    //     const dateFin = document.getElementById('fin').value;

    //     // Filtrer les données en fonction des dates sélectionnées
    //     const passagesFiltres = passages.filter((passage, index) => {
    //         const date = periode[index];
    //         return date >= dateDebut && date <= dateFin;
    //     });

    //     // Mettez à jour le graphique avec les nouvelles données filtrées
    //     updateChart(passagesFiltres, null); // Le dernier argument est null car nous ne regroupons pas par jour/semaine/mois ici
    // }
    
    closeModal(modal);

    const annees = ["2019"]//, "2020", "2021", "2022"];
    // Traite chaque fichier CSV
    annees.forEach(annee => {
        ({ passages, periode } = modalCanvasReader(annee, cols, passages, periode));
    });
    // document.getElementById('jour').addEventListener('change', () => {
    //     updateChart(passages, periode, 'jour');
    // });
    
    // document.getElementById('semaine').addEventListener('change', () => {
    //     updateChart(passages, periode, 'semaine');
    // });
    
    // document.getElementById('mois').addEventListener('change', () => {
    //     updateChart(passages, periode, 'mois');
    // });
}

function closeModal(modal) {
    const exit = document.querySelector(".close");
    const fermer = document.getElementById("fermer");

    modal.style.display = 'block';

    // Fermer la modal lorsque l'utilisateur clique en dehors de la modal, sur le bouton fermer ou le (x)
    window.addEventListener('click', (event) => {
        if (event.target === modal || event.target === exit || event.target === fermer) {
            modal.style.display = 'none';

        }
    });
}

function updateChartWithSelectedDates(dateDebutInput, dateFinInput, passages, periode) {
    const dateDebut = new Date(dateDebutInput.value);
    const dateFin = new Date(dateFinInput.value);

    const filteredPassages = [];
    const filteredPeriode = [];

    for (let i = 0; i < passages.length; i++) {
        const passageDate = new Date(periode[i]);
        if (passageDate >= dateDebut && passageDate <= dateFin) {
            filteredPassages.push(passages[i]);
            filteredPeriode.push(periode[i]);
        }
    }

    updateChart(filteredPassages, filteredPeriode, null);
}

function modalCanvasReader(annee, IDsCompteurs, passages, periode) {
    fetch(`/data/comptage_velo_${annee}.csv`)
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n');
            const IDsComptageVelo = rows[0].split(",").slice(1);

            // comptageExplorer2(rows, IDsComptageVelo, IDsCompteurs, passages, periode);

            const monthData = rows.filter(date => date.startsWith('2019-01')); /// un exemple avec le mois de janvier
            const monthLength = monthData.length/24; /// Pour le nombre de jour du mois
            let index = IDsComptageVelo.indexOf(IDsCompteurs[0])+1;
            
            for (let j = 1; j <= monthLength; j++) {
                let dataData = ''; /// initialiser les données du jour
                if (j <= 9){
                    dataData = monthData.filter(date => date.startsWith('2019-01-0'+j)) /// pour les jour de 0 à 9. Ex 2019-01-08
                }else {
                    dataData = monthData.filter(date => date.startsWith('2019-01-'+j)) ///pour les jour de 10 et +. Ex 2019-01-20
                }
                let total = 0; /// nombre de passage par jour
                dataData.forEach(day =>{
                    const values = day.split(','); /// concerne juste les ID
                    total += Number(values[index]);
                })
                passages.push(total) /// On insert le total de passage de chaque jour. pour l'ID 3
            }

            // Appele la fonction pour mettre à jour le graphique avec les données filtrées
            updateChart(passages, periode, null);
            // console.log(passages);
            // console.log(periode);
        })
        .catch(error => console.error("Une erreur s'est produite :", error));
    return { passages, periode };
}

function comptageExplorer2(rows, IDsComptageVelo, IDsCompteurs, passages, periode) {
    for (let i = 0; i < IDsComptageVelo.length; i++) {
        if (IDsCompteurs[0] == IDsComptageVelo[i]) {
            rows.forEach(row => {
                const cols = row.split(',');

                const unPassage = cols[i + 1]; // Un passage
                passages.push(unPassage);

                const uneDate = cols[0]; // Une date
                periode.push(uneDate);
            });
        }
    }
}

function comptageExplorer(rows, IDsComptageVelo, IDsCompteurs, passages, periode) {
    for (let i=0; i<IDsComptageVelo.length; i++) {
        if (IDsCompteurs[0] == IDsComptageVelo[i]) {
            rows.forEach(row => {
                const cols = row.split(',');
                
                const unPassage = cols[i + 1]; // Un passage
                passages.push(unPassage);
                
                const uneDate = cols[0]; // Une date
                periode.push(uneDate);
            });
        }
    }
}

