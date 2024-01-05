const moduleExpress = require('express'); // importation du module expresse 
const monRouter = moduleExpress.Router();  // creation du mini application express




// importons le fichier controleur dans le fichier route
const controllerInsererFontaine = require('../../controllers/controllers-fontaines/controller_inserer_fontaines')



//! creation de la route 
monRouter.post('/insererFontaine',controllerInsererFontaine.insererFontaine);















module.exports = monRouter;  // exportons les routes vers l'API