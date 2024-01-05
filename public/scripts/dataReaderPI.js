import {PageManager} from "./PageManager.js";
import {PIManager} from "./PIManager.js";
import Generale, {alertType} from "./general.js";

const PointInteretModal = {
    Nom_parc_lieu: document.getElementById('nom_lieu'),
    Intersection: document.getElementById('adresse'),
    CodePostal: document.getElementById('code_postal'),
    Arrondissement: document.getElementById('modal_arrondissement'),
    Date_installation: document.getElementById('date_implantation'),
    Type: document.getElementById('modal_type_lieu'),
    Latitude: document.getElementById('latitude'),
    Longitude: document.getElementById('longitude'),
    Remarque: document.getElementById('remarques')
}

const pageManager = new PageManager('pagination_container');
const piManager = new PIManager();
const generale = new Generale()

const carte = L.map('map').setView([45.551814, -73.734465], 10);
let layerGlobal = L.geoJSON();

const url = 'pointsdinteret'
let selectedRow = null
const arrondissementMap = new Map()
let selectTerritoire;

/**
 * Afficher la carte des pistes cyclclable sur la page
 */
function afficherCarte(map) {
    const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
        maxZoom: 20, ext: 'png', edgeBufferTiles: 1
    });
    layer.addTo(map)
}

function selectionnerSurCarte(nom) {
    fetch('/data/territoires.geojson')
        .then(response => response.json())
        .then(data => {
            layerGlobal.clearLayers();
            let codeID = 0;
            if (nom !== 'Tout') {
                codeID = [...arrondissementMap].filter(([key, value]) => value === nom)[0][0]
            }

            layerGlobal = L.geoJSON(data.features, {
                style: {
                    color: 'grey', weight: 1,
                }, onEachFeature: async function (feature, layer) {
                    if (codeID !== 0) {
                        if (feature.properties['CODEID'] === codeID) {
                            layer.setStyle({
                                color: 'red', weight: 1,
                            })
                        }
                    }

                    layer.on('click', (e) => {
                        layerGlobal.resetStyle()
                        layerGlobal.setStyle({
                            color: 'grey', weight: 1,
                        })
                        e.target.setStyle({
                            color: 'red', weight: 1,
                        })
                        const arrondissement = arrondissementMap.get(feature.properties['CODEID'])
                        selectTerritoire.value = arrondissement
                        filtrerTableau(arrondissement)

                    })
                }
            });
            layerGlobal.addTo(carte);

        })
}

async function showTable(pointI) {


    const uniqueNames = new Set();

    const tableBody = document.getElementById('donnees');
    tableBody.innerHTML = ""


    pointI.forEach(pi => {
        const tableRow = document.createElement('tr');
        tableRow.className = 'row'

        const tableRowData = {}
        uniqueNames.add(pi.Nom_parc_lieu)

        tableRowData['ID'] = pi.ID;
        tableRowData['Arrondissement'] = pi.Arrondissement;
        tableRowData['Type'] = pi.Type;
        tableRowData['Nom'] = pi.Nom_parc_lieu;
        if (pi.CodePostal) tableRowData['Adresse'] = pi.Intersection + ', ' + pi.CodePostal; else tableRowData['Adresse'] = pi.Intersection

        if (selectedRow?.ID === pi.ID) {
            tableRow.classList.add('active')
        }


        for (const tableRowKey in tableRowData) {
            const idCell = document.createElement('td')
            idCell.textContent = tableRowData[tableRowKey];
            tableRow.appendChild(idCell)
        }

        tableBody.appendChild(tableRow)

        tableRow.addEventListener('click', function () {
            const currentRow = document.getElementsByClassName('row active')[0];
            if (currentRow !== undefined) currentRow.className = currentRow.className.replace('active', ' ');

            selectedRow = pi
            this.className = "row active";
        })
    })
    Array.from(uniqueNames).sort();


}

async function updateTable() {
    let request = pageManager.getPageRequest();
    const reponse = await piManager.getSomePI(request);
    pageManager.dataLegth = reponse.data.taille
    const data = reponse.data.data
    window.history.pushState(data, '', url + request);
    await showTable(data)

}


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

async function creerListeDeroulante(id = 'selection-arrondissement') {
    const reponse = await fetch(`/data/territoires.csv`)
    const data = await reponse.text();
    const rows = data.trim().split('\r\n');
    const select = document.getElementById(id);
    const nomsArrondissement = []
    rows.forEach(row => {
        const nom = row.split(',')[0];
        const id = row.split(',')[1];
        nomsArrondissement.push(nom)
        arrondissementMap.set(Number(id), nom)
    })
    nomsArrondissement.sort()
    nomsArrondissement.forEach(nom => {
        const option = document.createElement('option');
        option.text = nom.toString();
        option.value = nom.toString();
        select.appendChild(option);
    })
    return select;
}

async function obtenirDonneesPIModal() {
    const pointInteret = {};
    for (let key in PointInteretModal) {
        pointInteret[key] = PointInteretModal[key].value
    }
    return pointInteret
}

function effacerDonneesPIModal() {
    for (let key in PointInteretModal) {
        PointInteretModal[key].value = ''
    }
}

function demarrerModificationPI() {
    const pointInteret = selectedRow
    window.history.pushState(pointInteret, '', url + `/${pointInteret.ID}`);
    for (let key in PointInteretModal) {
        if (pointInteret[key]) PointInteretModal[key].value = pointInteret[key]
    }
}


async function ajouterPI() {
    const pointInteret = await obtenirDonneesPIModal();
    pointInteret.ID = await piManager.getLastID() + 1
    const reponse = await piManager.addPI(pointInteret)
    if (reponse.statut === 'success') {
        generale.showAlert(reponse.message)
    }
}

async function modifierPI() {
    const pointInteret = await obtenirDonneesPIModal();
    pointInteret.ID = selectedRow.ID
    const reponse = await piManager.updatePI(pointInteret)
    if (reponse.statut === 'success') {
        generale.showAlert(reponse.message)
    }

}

async function supprimerPI() {
    if (!selectedRow) {
        generale.showAlert('Veuillez sélectionner un point d\'intérêt à supprimer svp', alertType.error)
    } else {
        const confirmation = confirm('Voulez-vous supprimer ce point d\'intérêt?')
        if (confirmation) {
            const reponse = await piManager.deletePI(selectedRow.ID)
            if (reponse.statut === 'success') {
                await updateTable()
            }
            generale.showAlert(reponse.message)
        }
    }
}

async function afficherModalForm(esEnregistrement) {
    const modal = document.getElementById('modal');
    const selecTypeLieu = document.getElementById('modal_type_lieu');
    const lalContainer = document.getElementById('latitude_container');
    const longContainer = document.getElementById('longitude_container');

    function hideShowLatLgt() {
        if (selecTypeLieu.value === 'Fontaine à boire') {
            lalContainer.style.display = 'flex'
            longContainer.style.display = 'flex'
        } else {
            lalContainer.style.display = 'none'
            longContainer.style.display = 'none'
        }
    }

    selecTypeLieu.addEventListener('change', () => {
        hideShowLatLgt()
    })
    if (!esEnregistrement && !selectedRow) {
        generale.showAlert(`Veuillez sélectionner un point d'intérêt à modifier svp`, alertType.error)
    } else {
        if (!esEnregistrement) {
            demarrerModificationPI()
            hideShowLatLgt()
        }

        await creerListeDeroulante('modal_arrondissement')
        modal.showModal();
    }
}

function fermerModalForm() {
    const modal = document.getElementById('modal');
    window.history.back()
    effacerDonneesPIModal()
    modal.close();
}

async function afficherModalCarte() {

    const modal = document.getElementById('modal_carte');
    const title = document.getElementById('carte-modale-title');
    const territoire = selectedRow.Arrondissement

    const reponse = await piManager.getSomePI('?territoire=' + territoire)
    const data = reponse.data.data

    title.textContent = "Points d'intérêts : " + territoire + ` (${reponse.data.taille} PI)`

    modal.showModal();
    let modalCarte = L.map('carte').setView([selectedRow.Latitude, selectedRow.Longitude], 12);
    afficherMarqueur(modalCarte, data,)
    afficherCarte(modalCarte)


    const btnFermerModalCarte = document.getElementById('modalMap_bouton_fermer');
    btnFermerModalCarte.addEventListener('click', async function () {
        await modal.close();
        await modalCarte.remove()
    })

    const iconFermerModalCarte = document.getElementById('icon-fermer-modal-carte');
    iconFermerModalCarte.addEventListener('click', function () {
        modal.close();
        modalCarte.remove()

    })
}

function fermerModalCarte() {
    const modal = document.getElementById('modal_carte');
    modal.close();

}

function afficherMarqueur(carte, data) {
    const clickedIcon = L.icon({
        iconUrl: '/public/images/marqueurs/greenIcon.png', iconSize: [35, 35], popupAnchor: [1, -20],
    });

    const normalIcon = L.icon({
        iconUrl: '/public/images/marqueurs/redIcon.png', iconSize: [35, 35], popupAnchor: [1, -20],
    });


    let lalLong = {}
    let activeMarker

    function creerMarke(pi, icon = normalIcon) {
        const marker = L.marker([pi.Latitude, pi.Longitude], {icon: icon}).addTo(carte);
        marker.bindPopup(pi.Nom_parc_lieu);
        marker.on('click', () => {

            if (activeMarker) {
                activeMarker.setIcon(normalIcon);
                lalLong = marker.getLatLng()
            }
            marker.setIcon(clickedIcon);
            activeMarker = marker;

        });

        marker.on('mouseover', () => {
            marker.setIcon(clickedIcon).openPopup();
        })
        marker.on('mouseout', () => {
            if (marker.getLatLng() !== lalLong) {
                marker.setIcon(normalIcon).closePopup()
            }
        })
        return marker
    }


    const startMarker = creerMarke(selectedRow, clickedIcon)
    lalLong = startMarker.getLatLng()
    activeMarker = startMarker

    data.forEach(pi => {
        if (pi.ID !== selectedRow.ID) {
            creerMarke(pi)
        }
    })

}

function afficherFermeSousMenu(isOpnened) {
    const sousMenu = document.getElementById('sous_menu_div');
    sousMenu.style.visibility = isOpnened ? 'visible' : 'hidden'
}

async function filtrerTableau(nom) {
    pageManager.request.territoire = nom
    await updateTable()
    pageManager.buildPaginationManger(updateTable)
}

async function main() {
    await updateTable()
    pageManager.buildPaginationManger(updateTable)


    let esUnEnregistrement = true
    let esSousMenuOuvert = false;

    selectTerritoire = await creerListeDeroulante();
    selectionnerSurCarte(selectTerritoire.value)

    selectTerritoire.addEventListener('change', async function () {
        //  const territoire = selectTerritoire.value;
        selectionnerSurCarte(selectTerritoire.value);
        await filtrerTableau(selectTerritoire.value)
    });

    const selectTypeLieu = document.getElementById('selection-lieu')
    selectTypeLieu.addEventListener('change', async function () {
        pageManager.request.type = selectTypeLieu.value;
        await updateTable()
        pageManager.buildPaginationManger(updateTable)

    });

    const btnGrosMenu = document.getElementById('menu_plus');
    btnGrosMenu.addEventListener('click', function () {
        esSousMenuOuvert = !esSousMenuOuvert;
        afficherFermeSousMenu(esSousMenuOuvert)
    })

    const btnDemarrerModif = document.getElementById('icon_modifier');
    btnDemarrerModif.addEventListener('click', async function () {
        const userIsConnected = window.localStorage.getItem('statut')
        if (userIsConnected !== 'yes') {
            generale.showAlert("Vous n'êtes pas identifié! Veuillez vous identifier pour modifier un PI", alertType.error)
        } else {
            esUnEnregistrement = false
            await afficherModalForm(false)
        }

    })

    const btnFermerModal = document.getElementById('icon-fermer');
    btnFermerModal.addEventListener('click', function () {
        fermerModalForm()
    })


    const btnAnnulerEnr = document.getElementById('modal_bouton_annuler');
    btnAnnulerEnr.addEventListener('click', function () {
        fermerModalForm()
    })

    const btnEnregistrerPI = document.getElementById('modal_bouton_enregistrer')
    btnEnregistrerPI.addEventListener('click', async () => {
        if (esUnEnregistrement) await ajouterPI(); else await modifierPI()
        fermerModalForm()
        await updateTable()
    })

    const btnSupprimerPI = document.getElementById('icon_supprimer');
    btnSupprimerPI.addEventListener('click', async function () {
        const userIsConnected = window.localStorage.getItem('statut')
        if (userIsConnected !== 'yes') {
            generale.showAlert("Vous n'êtes pas identifié! Veuillez vous identifier pour supprimer un PI", alertType.error)
        } else
            await supprimerPI()
    })
    const btnAfficherModalCarte = document.getElementById('icon_location');
    btnAfficherModalCarte.addEventListener('click', async () => {
    })

    const btnDemarrerEnregistrement = document.getElementById('menu_ajouter');
    btnDemarrerEnregistrement.addEventListener('click', () => {
        const userIsConnected = window.localStorage.getItem('statut')
        if (userIsConnected !== 'yes') {
            generale.showAlert("Vous n'êtes pas identifié! Veuillez vous identifier pour enregistrer un PI", alertType.error)
        } else {
            esUnEnregistrement = true
            afficherModalForm(true)
        }


    })

    const boutonMap = document.getElementById('icon_location')
    boutonMap.addEventListener('click', () => {
        if (!selectedRow) {
            generale.showAlert('Veuillez sélectionner un point d\'intérêt à afficher svp', alertType.error)
        } else afficherModalCarte()
    })
}

main()
afficherCarte(carte);