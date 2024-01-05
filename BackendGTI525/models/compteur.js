const moduleMongoose = require("mongoose");
const shemaDonneCompteur =  moduleMongoose.Schema({
    ID:{type:Number,required:true},
    Ancien_ID:{type:Number},
    Nom:{type:String,required:true},
    Statut:{type:String,required:true},
    Latitude:{type:Number,required:true},
    Longitude:{type:Number,required:true},
    Annee_implante:{type:Number,required:true},    
    userID:    {type:String}  // userId non requis pour inserer dans la base de donnees
});

module.exports = moduleMongoose.model('Compteurs',shemaDonneCompteur);