import { updateChart } from './histogramme.js'
let map = L.map('map').setView([45.571814, -73.654465], 11);
setTimeout(() => {
    map.invalidateSize();
}, 1000);
// Source: https://www.iconsdb.com/soylent-red-icons/map-marker-2-icon.html
const clickedIcon = L.icon({
    iconUrl: '/public/images/marqueurs/greenIcon.png',
    iconSize: [35, 35],
    popupAnchor: [1, -20],
});
const normalIcon = L.icon({
    iconUrl: '/public/images/marqueurs/redIcon.png',
    iconSize: [35, 35],
    popupAnchor: [1, -20],
});
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
    maxZoom: 20,
    ext: 'png'
}).addTo(map);

const inputDate = document.getElementById("date");
const inputSearch = document.getElementById("searchBar");
const filtre = {}
let page = 1

function getFiltre() {
    let req = `/gti525/v1/compteurs?limite=${limite}&page=${page}`;
    for (const i in filtre) {
        req = req + '&' + i + '=' + filtre[i];
    };
    // console.log(req);
    return req
};

const limite = 10
let dataGlobale
let activeMarker
// let url = `/gti525/v1/compteurs?limite=${limite}&page=${page}`

async function readDATA() {
    const url = getFiltre()
    const response = await fetch(url)
    const dataGlobale = await response.json();
    console.log(dataGlobale)
    const tableBody = document.getElementById('donnees');
    tableBody.innerHTML = ''

    dataGlobale.resultats.forEach(unCompteur => {
        const ID = unCompteur.ID;
        const Nom = unCompteur.Nom;
        const Statut = unCompteur.Statut;
        const Annee_implante = unCompteur.Annee_implante;
        const tableRow = document.createElement('tr');

        // Les champ qu'on veut afficher
        const fieldToDisplay = [ID, Nom, Statut, Annee_implante];

        const Latitude = unCompteur.Latitude;
        const Longitude = unCompteur.Longitude;

        coordonnees(Latitude, Longitude, Nom);
        colsAAfficher(fieldToDisplay, tableRow, tableBody);
        accesModal(fieldToDisplay, tableRow);
    });
    
    return dataGlobale
}
pagination()
recherche()
date()

function coordonnees(Latitude, Longitude, Nom) {
    if (!isNaN(Latitude) && !isNaN(Longitude)) {
        const marker = L.marker([Latitude, Longitude], { icon: normalIcon }).addTo(map);
        marker.bindPopup(`${Nom}`);
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
}

async function pagination() {
    const data = await readDATA()
    console.log(data);
    const pageTotal = data.stats.pages_total
    // console.log(pageTotal);

    // console.log(page);
    // Pagination

    const lesPages = document.getElementById('lesPages')
    lesPages.innerHTML = ''

    for (let i = 1; i <= pageTotal; i++) {
        const numPage = document.createElement('a');
        numPage.id = "numPage"
        if (i == 1) {
            numPage.classList.add('active')
        }
        numPage.textContent += i;
        numPage.addEventListener('click', function () {
            const pageCourante = document.getElementsByClassName('active')[0]
            pageCourante.classList.remove('active')
            this.classList.add('active')
            // console.log(numPage.textContent);
            page = numPage.textContent
            // filtre.page = page
            readDATA()
        });
        lesPages.appendChild(numPage);
    }
    const btnSuivant = document.getElementById('prochain')
    btnSuivant.addEventListener('click', () => {
        // console.log("suivant: "+ page, pageTotal);
        if (page < pageTotal) {
            const pageCourante = document.getElementsByClassName('active')[0]
            pageCourante.classList.remove('active')
            page++
            // console.log(page);
            // filtre.page = page
            lesPages.children[page-1].classList.add('active')
            readDATA()
        }
    })
    const btnPrecedent = document.getElementById('precedent')
    btnPrecedent.addEventListener('click', () => {
        console.log("precedent: "+ page, pageTotal);
        if (page > 1) {
            const pageCourante = document.getElementsByClassName('active')[0]
            pageCourante.classList.remove('active')
            page--
            // console.log(page);
            lesPages.children[page-1].classList.add('active')
            // filtre.page = page
            readDATA()
        }
    })
}

async function date() {
    inputDate.addEventListener("keypress", async (event) => {
        const table = document.getElementById('donnees');
        if (event.key === "Enter") {
            if (inputDate.value) {
                filtre.implantation = inputDate.value
                page = 1
                console.log(page);
                // filtre.page = page
                await pagination()
                // readDATA()
            } 
            // else {
            //     table.innerHTML = ''
            //     readDATA()
            // }
        }
    });
}

async function recherche() {
    inputSearch.addEventListener("keypress", (event) => {
        const table = document.getElementById('donnees');
        if (event.key === "Enter") {
            if (inputSearch.value) {
                // Effectuez une requête Fetch vers votre API
                fetch(`/gti525/v1/compteurs?nom=${inputSearch.value}`)
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
                table.innerHTML = ''
                readDATA()
            }
        }
    });
}




function colsAAfficher(fieldToDisplay, tableRow, tableBody) {
    fieldToDisplay.forEach(index => {
        const tableCell = document.createElement('td');
        tableCell.textContent = index;
        tableRow.appendChild(tableCell);
    });
    tableBody.appendChild(tableRow);
}

function accesModal(fieldToDisplay, tableRow) {
    const actionCell = document.createElement('td');
    const button = document.createElement('button');
    button.innerHTML = '<i class="material-symbols-outlined">equalizer</i>Passages';
    button.addEventListener('click', () => {
        openModal(fieldToDisplay);
    });
    actionCell.appendChild(button);
    tableRow.appendChild(actionCell);
}

function openModal(fieldToDisplay) {
    const modal = document.getElementById('myModal');

    const heading = document.querySelector(".modal-header h1");
    heading.innerHTML = `Statistiques des passages: ${fieldToDisplay[1]} | ${fieldToDisplay[0]}`;

    modalCanvasReader(fieldToDisplay, 'jour');
    const jourInput = document.querySelector("#jour");
    jourInput.checked = true;


    document.getElementById('debut').addEventListener('change', updateChartWithDateRange);
    document.getElementById('fin').addEventListener('change', updateChartWithDateRange);

    function updateChartWithDateRange() {
        const dateDebut = document.getElementById('debut').value;
        const dateFin = document.getElementById('fin').value;
        document.getElementById('jour').addEventListener('change', () => {
            // console.log("jour");
            modalCanvasReader(fieldToDisplay, 'jour', dateDebut, dateFin);
        });

        document.getElementById('semaine').addEventListener('change', () => {
            // console.log("semaine");
            modalCanvasReader(fieldToDisplay, 'semaine', dateDebut, dateFin);
        });

        document.getElementById('mois').addEventListener('change', () => {
            // console.log("mois");
            modalCanvasReader(fieldToDisplay, 'mois', dateDebut, dateFin);
        });
        const input = document.querySelector('input').value

        console.log("input: " + input);
        console.log("debut: " + dateDebut);
        console.log("fin: " + dateFin);

        modalCanvasReader(fieldToDisplay, input, dateDebut, dateFin)
    }
    closeModal(modal);
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

function modalCanvasReader(IDCompteur, intervalle, debut, fin) {
    // console.log(IDCompteur[0]);
    fetch(`/gti525/v1/compteurs/${IDCompteur[0]}/passages?debut=${debut}&fin=${fin}&intervalle=${intervalle}`)
        .then(response => response.json())
        .then(data => {
            const stats = data.stats
            const passages = stats.passages_par_intervalle;
            const periode = stats.periode;
            updateChart(passages, periode, intervalle);
        })
        .catch(error => console.error("Une erreur s'est produite dans modalCanvasReader :", error));
}