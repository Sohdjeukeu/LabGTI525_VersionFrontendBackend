const moduleExpress = require('express'); // importation du module expresse 
const monRouter = moduleExpress.Router();  // creation du router qui est une mini application express

// importation du controleur des compteurRoutes
const controlleurCompteurRoute = require('../controllers/controllerCompteurRoute');



// routes pour retourner tous les compteurs 
monRouter.get('/compteurs',controlleurCompteurRoute.retournerTousLesCompteurs);











module.exports = monRouter;