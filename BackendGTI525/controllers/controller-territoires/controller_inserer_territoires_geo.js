const modelterritoiresGeoJson = require('../../models/territoires_geo');
const modulepath = require('path');
const modulefs = require('fs').promises;

module.exports.insererTerritoireGeoJson = async (req, res, next) => {
 try {
    const urlFichier = modulepath.join(__dirname, '../../', 'public', 'data', 'territoires.geojson');
    const fichierContenu = await modulefs.readFile(urlFichier, 'utf-8');  

    // transforme la chaîne de données Json en objet javaScript
    const JsonObjet = JSON.parse(fichierContenu);
    const features = JsonObjet.features;


  const insertionResultat = await modelterritoiresGeoJson.insertMany(features);
     
    // iterer sur chaque feautures puis inserer dans la base de données
  // res.status(201).send({ Message: 'Insertion réussie', resultat: insertionResultat });
     console.log('Insertion réussie');
    // console.log(insertionResultat);
  // console.log( insertionResultat.features);
 console.log(features); 
 console.log(features.length);
 //console.log(features);
 res.send({Message:"ok"});
 //res.json(features);
  
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    console.error(JSON.stringify(error,null,2));

    res.status(500).send({ error: error.message});
  }

};
