const modelFeatures = require('../../models/reseau_cyclable');
const modulepath = require('path');
const modulefs = require('fs').promises;
//const moduleGeojson = require('geojson');

module.exports.insererFeatures = async (req, res, next) => {
 try {
    const urlFichier = modulepath.join(__dirname, '../../', 'public', 'data', 'reseau_cyclable.geojson');
    const fichierContenu = await modulefs.readFile(urlFichier, 'utf-8');  

    // transforme la chaîne de données Json en objet javaScript
    const JsonObjet = JSON.parse(fichierContenu);
    const features = JsonObjet.features

   // console.log(features[0]);
     const insertionResultat = await modelFeatures.insertMany(features);
     
   res.status(201).send({ Message: 'Insertion réussie', resultat: insertionResultat });
    console.log('Insertion réussie');
   console.log(insertionResultat.lenght);
   //console.log( insertionResultat);
 //console.log(features); 
// console.log(features);
 //res.send({message:"ok"})
  
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    console.error(JSON.stringify(error,null,2));

    res.status(500).send({ error: error.message});
  }

};
