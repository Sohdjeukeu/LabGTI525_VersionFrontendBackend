const modelFontaine = require('../../models/fontaine');
const moduleCsvToJson = require('csvtojson');
const modulepath = require('path');

module.exports.insererFontaine = async (req,res,next)=>{
  try
    {
        const urlFichier = modulepath.join(__dirname,'../../','public','data','fontaines.csv'); 
         const jsonArray = await moduleCsvToJson().fromFile(urlFichier);
        const insertionResultat = await modelFontaine.insertMany(jsonArray);
        res.status(201).send({ Message: 'Insertion réussie',resultat: insertionResultat});
        console.log(insertionResultat);
        // console.log("bonjour Merlin");
        // res.send({message:"ok"});
    }
catch (error) {
        res.status(500).send({error});
    }
    }

