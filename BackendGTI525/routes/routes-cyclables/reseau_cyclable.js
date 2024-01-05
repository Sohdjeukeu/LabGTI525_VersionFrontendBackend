const moduleExpress = require('express'); // importation du module expresse 
const monRouter = moduleExpress.Router();  // creation du router qui est une mini application express

// importation du controleur des compteurRoutes
const controlleurInsererReseauCyclable = require('../../controllers/controllers-reseau-cycable/controller_inserer_reseau_cyclable_geo');
const controllerAfficherTousPistesCyclables = require('../../controllers/controllers-reseau-cycable/controller-afficher-les-pistes');
const controllerAfficherUnePistesCyclable = require('../../controllers/controllers-reseau-cycable/controller-afficher-une-piste-cyclable');
const controllerAfficherPistesCyclableLesPlusPopulaires = require('../../controllers/controllers-reseau-cycable/controller-afficher-les-pistes-populaires');

// routes pour insere les features du reseau cyclabe
monRouter.post('/insererReseauCyclable',controlleurInsererReseauCyclable.insererFeatures);

/** afficher une piste cyclable spécifique */
monRouter.get('/pistes/:id',controllerAfficherUnePistesCyclable.afficherUnePisteCyclableSpecifique);

/** Afficher toutes les pistes cyclables */
monRouter.get('/pistes',controllerAfficherTousPistesCyclables.afficherTousLesPistesCyclables);




/** afficher Les pistes cyclables les plus populaires depuis le 1 juin 2022 (2022-06-01). */
monRouter.get('/pistesPopulaire',controllerAfficherPistesCyclableLesPlusPopulaires.afficherLesPistesCyclablesPopulaire);


module.exports = monRouter;




