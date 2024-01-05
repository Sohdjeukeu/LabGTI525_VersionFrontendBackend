const moduleExpress = require('express');
const monRouter = moduleExpress.Router(); // creation de la mini Application Expresse

//! importons le fichier controleur dans le router
const controlleurInsererTerritoiresCSV= require('../../controllers/controller-territoires/controller_inserer_territoiresCSV');
const controlleurInsererTerritoiresGeoJson= require('../../controllers/controller-territoires/controller_inserer_territoires_geo');




// creation de la route por insertion 
monRouter.post('/insererTerritoiresCSV',controlleurInsererTerritoiresCSV.insererTerritoiresCSV);
monRouter.post('/insererTerritoireGeojson',controlleurInsererTerritoiresGeoJson.insererTerritoireGeoJson);









module.exports = monRouter;