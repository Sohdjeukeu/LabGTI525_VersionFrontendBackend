const moduleExpress = require('express'); // importation du module expresse 
const monRouter = moduleExpress.Router();  // creation du router qui est une mini application express

// importation du controleur des compteurRoutes
const controlleurAfficherTousLesCompteurRoute2019 = require('../../controllers/controllers-compteurs/controller-afficher-les-compteur_2019');
const controlleurInsererCompteur2019= require('../../controllers/controllers-compteurs/controller_inserer_compteur_2019');
const controlleurInsererCompteur2020= require('../../controllers/controllers-compteurs/controller_inserer_compteur_2020');
const controlleurInsererCompteur2021= require('../../controllers/controllers-compteurs/controller_inserer_compteur_2021');
const controlleurInsererCompteur2022= require('../../controllers/controllers-compteurs/controller_inserer_compteur_2022');
const controlleurInsererCompteur= require('../../controllers/controllers-compteurs/controller_inserer_compteur');
const controlleurFusonnerCompteurs= require('../../controllers/controllers-compteurs/controller-fusion-compteurs');
const controlleurafficherLesCompteurs= require('../../controllers/controllers-compteurs/controller-afficher-tous-les-compteurs');
const controlleuressaie= require('../../controllers/controllers-compteurs/controllerEssaie');


// routes pour retourner tous les compteurs 
monRouter.get('/compteurs2019',controlleurAfficherTousLesCompteurRoute2019.afficherTousLesCompteurs2019);

/** afficher tous les compteurs */
monRouter.get('/compteurs',controlleurafficherLesCompteurs.afficherTousLesCompteurs);
// insererCompteurs routes
monRouter.post('/insererCompteurVelo2019',controlleurInsererCompteur2019.insererCompteur2019);
monRouter.post('/insererCompteurVelo2020',controlleurInsererCompteur2020.insererCompteur2020);
monRouter.post('/insererCompteurVelo2021',controlleurInsererCompteur2021.insererCompteur2021);
monRouter.post('/insererCompteurVelo2022',controlleurInsererCompteur2022.insererCompteur2022);
monRouter.post('/insererCompteur',controlleurInsererCompteur.insererCompteurs);
monRouter.post('/fusionnerLesCompteurs',controlleurFusonnerCompteurs.fusionnerLesCompteurs) ;



monRouter.post('/passage',controlleuressaie.insererCompteurEssaie) ;





module.exports = monRouter;




