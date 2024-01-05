const modelCompteur = require('../../models/compteur_2021');
const moduleCsvToJson = require('csvtojson');
const modulepath = require('path');

module.exports.insererCompteur2021 = async (req,res,next)=>{
  try
    {
        const urlFichier = modulepath.join(__dirname,'../../','public','data','comptage_velo_2021.csv'); 
      //  const urlFichier1 = modulepath.join(process.cwd(),'public','/data/comptage_velo_2019.csv');  process.cwd() est uilisé avec le repertoire courant
         const jsonArray = await moduleCsvToJson().fromFile(urlFichier);
       const insertionResultat = await modelCompteur.insertMany(jsonArray);
        res.status(201).send({ Message: 'Insertion réussie',resultat: insertionResultat});
        console.log(jsonArray);
    }
catch (error) {
        console.error(err);
        res.status(500).send({ error: 'Erreur lors de l\'insertion ou de la conversion CSV en JSON' });
    }
    }
