const moduleMongoose = require("mongoose");
const shemaDonneCompteurRoute =  moduleMongoose.Schema({
        
     // date:{type:Date,required:false},
     // idCompteur:{type:Number, required:false},
      
});

module.exports = moduleMongoose.model('ModelCompteurRoute',shemaDonneCompteurRoute);