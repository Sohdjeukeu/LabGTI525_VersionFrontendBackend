const modelCompteur = require('../../models/compteur');
const moduleCsvToJson = require('csvtojson');
const modulepath = require('path');

module.exports.insererCompteurs = async (req,res,next)=>{
  try
    {
        const urlFichier = modulepath.join(__dirname,'../../','public','data','compteurs.csv'); 
      //  const urlFichier1 = modulepath.join(process.cwd(),'public','/data/comptage_velo_2019.csv');  process.cwd() est uilisé avec le repertoire courant
         const jsonArray = await moduleCsvToJson().fromFile(urlFichier);
         const insertionResultat = await modelCompteur.insertMany(jsonArray);
        res.status(201).send({ Message: 'Insertion réussie',resultat: insertionResultat});
        console.log(insertionResultat);
      // res.send({jsonArray})
    }
catch (error) {
       // console.error(err);
        res.status(500).send({ error });
    }
    }

