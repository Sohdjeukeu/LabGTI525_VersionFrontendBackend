const modelReseauCyclable= require('../models/reseau_cyclable2');
const moduleCsvToJson = require('csvtojson');
const modulefs = require('fs');
const modulepath = require('path');


module.exports.retournerTousLesPistesCyclables = (req,res,next)=>{
    const urlFichier = modulepath.join(__dirname,'..','public','data','reseau_cyclable.geojson'); // 
   //const urlFichier1 = modulepath.join(/*__dirname*/process.cwd(),'public','/data/comptage_velo_2019.csv'); // process.cwd() est uilisé avec le repertoire courant
    moduleCsvToJson().fromFile(urlFichier)
    .then(pisteCyclables => {
        console.log(pisteCyclables);
        res.status(200).send({pisteCyclables});
    });

   /* console.log(urlFichier);
    res.send({Messsage:"ok"});*/
}
