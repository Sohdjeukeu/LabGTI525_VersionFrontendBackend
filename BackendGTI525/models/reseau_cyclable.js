const moduleMongoose = require("mongoose");

// schema des données Features geospatiale
const shemaDesDonneeFeaturesReseauCyclable = moduleMongoose.Schema({
//     type: { type: String },
//     crs: {
//         type: { type: String },
//         properties: { name: { type: String } }
//     },
//  type: { type: String },
    properties: {
        ID_CYCL: { type: Number, required: true },
        ID_TRC: { type: Number, required: true },
        AFFICHEUR_DYNAMIQUE: { type: String, required: true },
        AVANCEMENT_CODE: { type: String, required: true },
        AVANCEMENT_DESC: { type: String, required: true },
        COMPTEUR_CYLISTE: { type: String, required: true },
        LONGUEUR: { type: Number, required: true },
        NBR_VOIE: { type: Number, required: true },
        NOM_ARR_VILLE_CODE: { type: String },
        NOM_ARR_VILLE_DESC: { type: String },
        PROTEGE_4S: { type: String, required: true },
        REV_AVANCEMENT_CODE: { type: String },
        REV_AVANCEMENT_DESC: { type: String },
        ROUTE_VERTE: { type: String, required: true },
        SAISONS4: { type: String, required: true },
        SAS_VELO: { type: String, required: true },
        SEPARATEUR_CODE: { type: String },
        SEPARATEUR_DESC: { type: String },
        TYPE_VOIE_CODE: { type: String, required: true },
        TYPE_VOIE_DESC: { type: String, required: true },
        TYPE_VOIE2_CODE: { type: String, required: true },
        TYPE_VOIE2_DESC: { type: String, required: true },
        VILLE_MTL: { type: String, required: true },
    },
    geometry: {
        type: { type: String, required: true },
        coordinates: { type: [[Number]], required: true }
    }
});
module.exports = moduleMongoose.model('featuresReseauCyclable', shemaDesDonneeFeaturesReseauCyclable);


