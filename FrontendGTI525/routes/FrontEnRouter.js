const moduleExpress = require('express'); // importation du module expresse 
const monRouter = moduleExpress.Router();  // creation du router qui est une mini application expres

// importation du controleur de demarrage de l'applicationweb frontale
const controleurDemarrageFrontend = require('../controllers/controlleurDemarrageFrontEnRouter');
const controleurItineraire = require('../controllers/controlleurItineraire');
const controleurPageStatistique = require('../controllers/controllerPageStatique');
const controleurpointsInterets = require('../controllers/contollerPointInteretRoute');
const controleurEquipe = require('../controllers/controllerEquipe');
const controleurApropos = require('../controllers/controllerApropos');


// creation de la route pour le demarrv1age de l'aplication frontale
monRouter.get('/v1',controleurDemarrageFrontend.demarrerApplicationWeb);
monRouter.get('/itineraire',controleurItineraire.afficherPageItineraire);
monRouter.get('/statistiques',controleurPageStatistique.afficherPageStatistique);
monRouter.get('/pointsInterets',controleurpointsInterets.afficherPagePointsInterets);
monRouter.get('/equipe',controleurEquipe.afficherPageEquipe);
monRouter.get('/apropos',controleurApropos.afficherPageApropos);



module.exports = monRouter;