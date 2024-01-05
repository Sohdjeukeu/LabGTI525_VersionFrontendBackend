import Generale from "./general.js";

const couleurPiste = {
    rev: '#2AC7DD',
    proteger: '#025D29',
    partager: '#84CA4B',
    polyvalent: '#B958D9'
}

const carte = L.map('map').setView([45.551814, -73.704465], 11);
let layerGroup = L.geoJSON();

const generale = new Generale();

let saisonFeatures = [];
const touteSaisonFeatures = [];
const quatreSaisonFeatures = [];


/**
 * Afficher la carte des pistes cyclclable sur la page
 */
function afficherCarte(){
    const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
        maxZoom: 20,
        ext: 'png'
    });
    layer.addTo(carte)
}
/**
 *
 * @param features
 */
const getLayerVoieREV = (features) => L.geoJSON(features, {
    filter: function (feature) {
        const rev = feature.properties['REV_AVANCEMENT_CODE'];
        return rev === 'EV' || rev === 'TR' || rev === 'PE';
    },
    style: {color: couleurPiste.rev}
});
/**
 * obtenir les pistes de type voies partagées
 * @param features
 */
const getLayerVoieProteger = (features) => L.geoJSON(features, {
    filter: function (feature) {
        const rev = feature.properties['REV_AVANCEMENT_CODE'];
        const avancement = feature.properties['AVANCEMENT_CODE'];
        const type = feature.properties['TYPE_VOIE_CODE'];
        if (rev !== 'EV' && rev !== 'TR' && rev !== 'PE' && avancement === 'E') {
            switch (type) {
                case '4':
                case '5':
                case '6':
                    return true
            }
        }
        return false;
    },
    style: {color: couleurPiste.proteger}
});
/**
 *
 * @param features les pistes
 */
const getLayerVoiePartager = (features) => L.geoJSON(features, {
    filter: function (feature) {
        if (feature.properties['AVANCEMENT_CODE'] === 'E') {
            switch (feature.properties['TYPE_VOIE_CODE']) {
                case '1':
                case '3':
                case '8':
                case '9':
                    return true
            }
        }
    },
    style: {color: couleurPiste.partager}
})
/**
 *
 * @param features
 */
const getLayerSentierPolyvalent = (features) => L.geoJSON(features, {
    filter: function (feature) {
        const avancement = feature.properties['AVANCEMENT_CODE'];
        const type = feature.properties['TYPE_VOIE_CODE'];
        return avancement === 'E' && type === '7';
    },
    style: {color: couleurPiste.polyvalent}
})

/**
 * afficher les groupes de piste de cyclables sur la carte
 */
function tracerPiste() {
    layerGroup.addTo(carte);
}

/**
 * ajouter les éléments de la légende de la carte
 * @param nom le nom du type de piste
 * @param description la descrition du type de piste
 * @param couleur la couleur des piste du type
 * @param modalBody l'élément html qui contient ses élément cité ci-haut de la fenetre modale
 */
function ajouterModalBodyElement(nom, description, couleur, modalBody) {


    const div = document.createElement('div');
    const couleurDiv = document.createElement('div');
    const nomPiste = document.createElement('h4');
    const descriptionPiste = document.createElement('p');

    div.className = 'couleur_titre';
    nomPiste.className = 'nom_piste';
    descriptionPiste.className = 'description'
    couleurDiv.className = 'couleur';

    couleurDiv.style.backgroundColor = couleur;
    div.appendChild(couleurDiv)

    nomPiste.textContent = nom;
    nomPiste.style.color = couleur;
    div.appendChild(nomPiste)

    modalBody.appendChild(div);

    descriptionPiste.textContent = description;
    modalBody.appendChild(descriptionPiste);

}

/**
 * Initailiser toutes les données données au lancement ou au chargement de la page
 */
function init() {
    window.addEventListener('load', () => {
        afficherCarte();
        generale.getFileData(generale.file.reseau_cyclable).then(data => {

            data.features.forEach(feature => {
                if (feature.properties['SAISONS4'] === 'Oui') {
                    quatreSaisonFeatures.push(feature);
                }
                touteSaisonFeatures.push(feature)
            })
            saisonFeatures = touteSaisonFeatures;
          //  gestionnaireCarte.ajouterPistesSaison(touteSaisonFeatures);
            ajouterToutLayer(saisonFeatures)
            tracerPiste();
        })
    });
}

/**
 * ajouter toutes les pistes cyclables dans le groupe de cycles
 * @param features les différentes feachtures. Saisonnières ou quatres saisons
 */
function ajouterToutLayer(features) {
    layerGroup.clearLayers();
    layerGroup.addLayer(getLayerVoiePartager(features));
    layerGroup.addLayer(getLayerVoieProteger(features));
    layerGroup.addLayer(getLayerSentierPolyvalent(features));
    layerGroup.addLayer(getLayerVoieREV(features));
}

/**
 * Selectionne le type de saison
 * permet d'afficher les voies protégées et/ou partagées
 */
function filterPiste() {

    const saisonnier = document.getElementById('saisonnier');
    const quatreSaison = document.getElementById('quatre_saison');

    const voieProteger = document.getElementById('voie_proteger');
    const voiePartarger = document.getElementById('voie_patarger');

    let isVoieProtergerChecked = voieProteger.checked;
    let isVoiePartagerChecked = voiePartarger.checked;

    function selectionVoie() {
        if (isVoieProtergerChecked) {
            if (isVoiePartagerChecked) {
                ajouterToutLayer(saisonFeatures);
            } else {
                layerGroup.clearLayers();
                layerGroup.addLayer(getLayerVoieProteger(saisonFeatures));
            }
        } else if (isVoiePartagerChecked) {
            if (isVoieProtergerChecked) {
                ajouterToutLayer(saisonFeatures);
            } else {
                layerGroup.clearLayers();
                layerGroup.addLayer(getLayerVoiePartager(saisonFeatures));
            }
        } else {
            ajouterToutLayer(saisonFeatures);
        }
    }

    saisonnier.addEventListener('click', function () {
        saisonFeatures = touteSaisonFeatures;
        selectionVoie();
        tracerPiste();
    })
    quatreSaison.addEventListener('click', function () {
        saisonFeatures = quatreSaisonFeatures;
        selectionVoie();
        tracerPiste();
    })

    voiePartarger.addEventListener('change', function () {
        isVoiePartagerChecked = this.checked;
        selectionVoie();
        tracerPiste();
    });
    voieProteger.addEventListener('change', function () {
        isVoieProtergerChecked = this.checked;
        selectionVoie();
        tracerPiste();
    });
}

/**
 * afficher la fenetre modale des légendes
 */
function afficherModal() {

    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal_body');

    ajouterModalBodyElement('Le REV', 'Ensemble de pistes cyclables qui relie divers ' +
       "points d'intérêts sur l'îles de Montréal", couleurPiste.rev, modalBody);
    ajouterModalBodyElement('Voie partagée', 'Des pistes cyclables délimitées ou des rues partagées par' +
        'les cyclistes et les automobilistes', couleurPiste.partager, modalBody);
    ajouterModalBodyElement('Voie protogée', 'Une voie distincte, séparée par un élément physique de la' +
        'circulation motorisée', couleurPiste.proteger, modalBody);
    ajouterModalBodyElement('Sentier polyvalent', 'Un chemin en dehors de la route ou le long de celle-ci, où' +
        'les piétons et les cyclistes peuvent circuler', couleurPiste.polyvalent, modalBody);

    const fermerModal = document.getElementById('fermerModal');
    const iconFermerModal = document.getElementById('icon-fermer');

    fermerModal.addEventListener('click', () => {
        modal.close();
        modalBody.innerHTML = "";
    })

    iconFermerModal.addEventListener('click', () => {
        modal.close();
        modalBody.innerHTML = "";
    })
    modal.showModal();
}

init()
filterPiste();

L.easyButton({
    position: 'topright',
    states: [{
        icon: 'fa-info',
        onClick: function (btn, map) {
            afficherModal();
        }
    }]
}).addTo(carte);
