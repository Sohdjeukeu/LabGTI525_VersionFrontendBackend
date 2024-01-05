const mongoose =  require('mongoose')

const fontaineSchema = mongoose.Schema(
    {
        "ID": {
            "type": "Number"
        },
        "Arrondissement": {
            "type": "String"
        },
        "Nom_parc_lieu": {
            "type": "String"
        },
        "Proximité_jeux_repère": {
            "type": "String"
        },
        "Intersection": {
            "type": "String"
        },
        "Etat": {
            "type": "String"
        },
        "Type": {
            "type": "String"
        },
        "CodePostal": {
            "type": "String"
        },
        "Date_installation": {
            "type": "String"
        },
        "Remarque": {
            "type": "String"
        },
        "Precision_localisation": {
            "type": "String"
        },
        "X": {
            "type": "String"
        },
        "Y": {
            "type": "String"
        },
        "Longitude": {
            "type": "String"
        },
        "Latitude": {
            "type": "String"
        }
    }
)
const PointInteret = mongoose.model('fontaines', fontaineSchema);
module.exports  = PointInteret