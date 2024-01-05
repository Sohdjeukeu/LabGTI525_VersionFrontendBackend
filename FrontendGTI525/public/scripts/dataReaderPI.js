const carte = L.map('map').setView([45.5355, -73.7881], 10);

/**
 * Afficher la carte des pistes cyclclable sur la page
 */
function afficherCarte() {
    const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
        maxZoom: 20,
        ext: 'png'
    });
    layer.addTo(carte)
}

let layer = L.geoJSON();

function selectionnerSurCarte(id = 12) {
    fetch('/data/territoires.geojson')
        .then(response => response.json())
        .then(data => {
            layer.clearLayers();
            layer = L.geoJSON(data.features, {
                style: {
                    color: 'grey',
                    weight: 1,
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties['CODEID'] === id) {
                        layer.setStyle({
                            color: 'red',
                        })
                    }
                }
                //style: {color: '#707070'}
            });
            layer.addTo(carte);

        })
}

function readCSV() {
    fetch('/data/fontaines.csv')
        .then(response => response.text())
        .then(data => {
            const tableBody = document.getElementById('donnees');
            const lines = data.trim().split('\n');


            // Sélectionnez les colonnes que vous voulez afficher (ignorez la première ligne qui est l'en-tête)
            const colsToDisplay = [0, 1, 5, 2, 4];
            const uniqueNames = new Set();

            lines.slice(1).forEach(row => {
                const cols = parseCSVLine(row);
                const name = cols[1].trim(); // Deuxième colonne (index 1) pour le nom

                if (!uniqueNames.has(name)) {
                    uniqueNames.add(name);

                    // // Ajoutez une option au select pour chaque nom unique
                    // const option = document.createElement('option');
                    // option.textContent = name;
                    // selectElement.appendChild(option);
                }

                const tableRow = document.createElement('tr');

                colsToDisplay.forEach(index => {
                    const tableCell = document.createElement('td');
                    tableCell.textContent = cols[index];
                    tableRow.appendChild(tableCell);
                });

                tableBody.appendChild(tableRow);
            });

            // Triez les noms en ordre alphabétique
            const sortedNames = Array.from(uniqueNames).sort();
            /*
                        const selectElement = document.getElementById('selection-arrondissement');
                        // Ajoutez les noms triés en tant qu'options au select
                        sortedNames.forEach(name => {
                            const option = document.createElement('option');
                            option.textContent = name;
                            selectElement.appendChild(option);
                        });*/

            // Ajoutez un gestionnaire d'événements pour le changement de sélection dans le select
            /*  selectElement.addEventListener('change', () => {
                  const selectedName = selectElement.value;
                  filterTableBySelectedName(selectedName);
               //   creerListeDeroulante();
              });*/

        })
        .catch(error => console.error("Une erreur s'est produite :", error));
}

// Fonction pour analyser une ligne CSV en prenant en compte les guillemets
function parseCSVLine(row) {
    const cols = [];
    let currentColumn = '';
    let guillements = false;

    for (let i = 0; i < row.length; i++) {
        const char = row[i];

        if (char === '"') {
            guillements = !guillements;
        } else if (char === ',' && !guillements) {
            cols.push(currentColumn);
            currentColumn = '';
        } else {
            currentColumn += char;
        }
    }

    cols.push(currentColumn);

    return cols;
}

// Fonction pour filtrer le tableau en fonction du nom sélectionné
function filterTableBySelectedName(selectedName) {
    const tableRows = document.querySelectorAll('#donnees tr');

    tableRows.forEach(row => {
        const nameCell = row.querySelector('td:nth-child(2)'); // Deuxième colonne (index 1) pour le nom

        if (selectedName === 'Tous' || nameCell.textContent === selectedName) {
            row.style.display = ''; // Afficher la ligne
        } else {
            row.style.display = 'none'; // Masquer la ligne
        }
    });
}

function creerListeDeroulante() {
    fetch(`/data/territoires.csv`).then(response => response.text()).then(data => {
            const rows = data.trim().split('\r\n');
            const select = document.getElementById('selection-arrondissement');

            let noms = [];
            let ids = [];
            ids.includes('123456');
            let abreviations = [];

            rows.forEach(row => {

                    ids.push(row.split(',')[1]);
                    abreviations.push(row.split(',')[1]);

                    const nom = row.split(',')[0];
                    const option = document.createElement('option');
                    option.text = nom.toString();
                    option.value = nom.toString();
                    select.appendChild(option);
                }
            )
            select.addEventListener('change', function () {
                const selectedName = select.value;
                filterTableBySelectedName(selectedName);
                selectionnerSurCarte(Number(ids[this.selectedIndex]));
                console.log();
                //   creerListeDeroulante();
            });

        }
    )
}

selectionnerSurCarte()
creerListeDeroulante();
afficherCarte();
readCSV();
// creerListeDeroulante(fileList.fontainesCSV, 1, listID.arrondissement)