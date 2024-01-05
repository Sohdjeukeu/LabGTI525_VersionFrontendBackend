const moduleMongoose = require("mongoose");
const shemaDonneFontaine =  moduleMongoose.Schema({
    ID: {type:String,required:true},
    Arrondissement: {type:String,required:true},
    Nom_parc_lieu: {type:String},
    Proximité_jeux_repère: {type:String},
    Intersection: {type:String},
    Etat: {type:String},
    Date_installation: {type:String},
    Remarque: {type:String},
    Precision_localisation: {type:String},
    X: {type:String,required:true},
    Y:{type:String,required:true},
    Longitude: {type:String,required:true},
    Latitude: {type:String,required:true},
    userID:    {type:String}  // userId non requis pour inserer dans la base de donnees
});
module.exports = moduleMongoose.model('Fontaine',shemaDonneFontaine);