const modelCompteur = require('../../models/compteur_2022');
const moduleCsvToJson = require('csvtojson');
const modulepath = require('path');

module.exports.insererCompteur2022 = async (req,res,next)=>{
  try
    {
        const urlFichier = modulepath.join(__dirname,'../../','public','data','comptage_velo_2022.csv'); 
         const jsonArray = await moduleCsvToJson().fromFile(urlFichier);
        const insertionResultat = await modelCompteur.insertMany(jsonArray);
        res.status(201).send({ Message: 'Insertion réussie',resultat: insertionResultat});
        console.log(jsonArray);
    }
catch (error) {
        console.error(err);
        res.status(500).send({error});
    }
    }

