const moduleExpress = require('express'); // importation du module expresse 
const monRouter = moduleExpress.Router();  // creation du router qui est une mini application express

// importation du controleur des compteurRoutes
const controlleurPisteCyclable = require('../controllers/controllerPisteRoute');



// routes pour retourner tous les compteurs 
monRouter.get('/pistes',controlleurPisteCyclable.retournerTousLesPistesCyclables);











module.exports = monRouter;