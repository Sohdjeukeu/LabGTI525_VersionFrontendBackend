const moduleExpress = require('express');
const monAPI = moduleExpress();
const moduleCors = require('cors');  // origines sont differentes pour empecher le blocage des requetes frontales 

monAPI.use(moduleCors());
monAPI.use(moduleExpress.json()); // intercepte toutes les requetes json.

//! connexion de l'API à la base de donnée MonoDB Atlas (cloud)
// chargeons les variables d'environnement de la base de données dans le fichier de l'application
const laChaineDeConnexionALaBD = process.env.MONGO_URI;
//console.log(laChaineDeConnexionALaBD);

const moduleMongoose = require('mongoose');

//! on peut définir une fonction pour se connecter à la base de donnée
 const seConneterALaBD = async ()=>{
   await moduleMongoose.connect(laChaineDeConnexionALaBD,
                                {
                                    serverSelectionTimeoutMS:30000
                                }
                         );
 };
// Appeler la methode de connection à la BD 
seConneterALaBD()
.then(() => console.log('Connexion à la base de données MongoDB Atlas réussie !'))
.catch(() => console.log('Connexion à MongoDb Atlas échouée'))
//.finally(()=>moduleMongoose.connection.close()); // fermée la connexion 

// moduleMongoose.connect('mongodb+srv://Merlin:1234@bdlabgti525equipe10gr01.dcsdljj.mongodb.net/?retryWrites=true&w=majority')
// moduleMongoose.connect(laChaineDeConnexionALaBD,
//                         {
                            
//                         }
//                       )
// .then(() => console.log('Connexion à la base de données MongoDB Atlas réussie !'))
// .catch(() => console.log('Connexion à MongoDb Atlas échouée'));



/* section importation des routes dans l' API rest  */
const importcompteurRoute = require('./routes/routes-compteurs/compteurRoute'); // importation des routes des compteurs 
const importRoutereseauCyclabe = require('./routes/routes-cyclables/reseau_cyclable');
const importeRouteFontaine = require('./routes/route-fontaine/routeFontaine');
const importeRouteTerritoire = require('./routes/routes-territoires/routes-territoires')

const importroutetest = require('./routes/routetest/routeDuTest');


/** utilisation de la racine de routes par l'API rest */   
monAPI.use('/gti525/v1',importcompteurRoute);
monAPI.use('/gti525/v1',importRoutereseauCyclabe);
monAPI.use('/gti525/v1',importeRouteFontaine);
monAPI.use('/gti525/v1',importeRouteTerritoire);
monAPI.use('/gti525/v1',importroutetest);





module.exports = monAPI;
