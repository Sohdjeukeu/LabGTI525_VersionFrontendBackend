const express = require('express'); // importation du module 

const monApp = express(); // creation de l'applcation express monApp
const modulePath = require('path');

//const moduleCors = require('cors'); // facilite la communication et l'applicaion frontale et son serveur meme origine 
//monApp.use(moduleCors());

//servir les fichiers statiques de l'aplication web frontend tres tres important.
monApp.use(express.static('./public'));

// Définir le répertoire contenant les modèles ('views')
monApp.set('./views', modulePath.join(__dirname,'./views'));
// Définir le moteur d'affichage à utiliser, dans ce cas 'some_template_engine_name'.
//monApp.set("view engine", 'ejs');

/* section importation des routes dans l'application web */
const importRouteDemarrageFrontend = require('./routes/FrontEnRouter');// importation de la route de demarrage de l'application web
const importcompteurRoute = require('./routes/CompteurRoute'); // importation des routes des compteurs 
const importPiste = require('./routes/pisteRoutes'); // importation des routes des compteurs 


/** section utilisation des routes utilisations des routes par l'application frontale pour les compteurRoute */ 
monApp.use('/gti525',importRouteDemarrageFrontend)

monApp.use('/gti525/v1',importcompteurRoute);
monApp.use('/gti525/v1',importPiste);





module.exports = monApp; // exportation de l'application vers le serveur frontend.
