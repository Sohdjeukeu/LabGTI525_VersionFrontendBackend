const modelCompteurRoute = require('../models/modelCompteurRoute');
const moduleCsvToJson = require('csvtojson');
const modulefs = require('fs');
const modulepath = require('path');


module.exports.retournerTousLesCompteurs = (req,res,next)=>{
    const urlFichier = modulepath.join(__dirname,'..','public','data','compteurs.csv'); // 
   //const urlFichier1 = modulepath.join(/*__dirname*/process.cwd(),'public','/data/comptage_velo_2019.csv'); // process.cwd() est uilisé avec le repertoire courant
    moduleCsvToJson().fromFile(urlFichier)
    .then(compteurJson => {
      //  console.log(JSON.parse(compteurJson));
        res.status(200).send({compteurJson});
    });
}
