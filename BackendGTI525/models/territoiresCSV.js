const moduleMongoose = require("mongoose");
const shemaDonneTerritoires =  moduleMongoose.Schema({
    12:{type:Number,required:true},
    "Mont-Royal":{type:String,required:true},
    MR:{type:String,required:true},
    
    userID:    {type:String}  // userId non requis pour inserer dans la base de donnees
});

module.exports = moduleMongoose.model('TerritoiresCSV',shemaDonneTerritoires);