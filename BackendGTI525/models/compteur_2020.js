const moduleMongoose = require("mongoose");
const shemaDonneCompteur2020 =  moduleMongoose.Schema({
    100001753: {type:String,required:true},
    100002880: {type:String,required:true},
    100003032: {type:String,required:true},
    100003034: {type:String,required:true},
    100003039: {type:String,required:true},
    100003040: {type:String,required:true},
    100003041: {type:String,required:true},
    100003042: {type:String,required:true},
    100004575: {type:String,required:true},
    100007390: {type:String,required:true},
    100011747: {type:String,required:true},
    100011748: {type:String,required:true},
    100011783: {type:String,required:true},
    100012217: {type:String,required:true},
    100012218: {type:String,required:true},
    100017441: {type:String,required:true},
    100017523: {type:String,required:true},
    100025474: {type:String,required:true},
    100034805: {type:String,required:true},
    100035408: {type:String,required:true},
    100035409: {type:String,required:true},
    100041101: {type:String,required:true},
    100041114: {type:String,required:true},
    100047030: {type:String,required:true},
    100052600: {type:String,required:true},
    100052601: {type:String,required:true},
    100052602: {type:String,required:true},
    100052603: {type:String,required:true},
    100052604: {type:String,required:true},
    100052605: {type:String,required:true},
    100052606: {type:String,required:true},
    100053055: {type:String,required:true},
    100053057: {type:String,required:true},
    100053058: {type:String,required:true},
    100053059: {type:String,required:true},
    100053209: {type:String,required:true},
    100053210: {type:String,required:true},
    100054073: {type:String,required:true},
    100054241: {type:String,required:true},
    100054585: {type:String,required:true},
    100055268: {type:String,required:true},
    100056188: {type:String,required:true},
    100057050: {type:String,required:true},
    100057051: {type:String,required:true},
    100057052: {type:String,required:true},
    100057053: {type:String,required:true},
    100057500: {type:String,required:true},
    300014916: {type:String,required:true},
    300014985: {type:String,required:true},
    300014986: {type:String,required:true},
    300014993: {type:String,required:true},
    300014994: {type:String,required:true},
    300014995: {type:String,required:true},
    300014996: {type:String,required:true},
    Date:     {type:String,required:true},
    //userID:    {type:String}  // userId non requis pour inserer dans la base de donnees
});

module.exports = moduleMongoose.model('Compteur_2020',shemaDonneCompteur2020);