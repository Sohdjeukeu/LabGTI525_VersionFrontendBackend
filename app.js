const express = require('express');
const connectDB = require('./configuration/dbConnectBD')


const app = express();
const port = 8080;
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectDB()

app.listen(port, ()=>{
    console.log(`Mon serveur en ligne sur le port ${port}`)
});

const urlBase = '/gti525/v1';

const compteursRoute = require('./routes/CompteursRoute');
const pisteRoute = require('./routes/ItineraireRoute');

const frontEndRouter = require('./routes/FrontEndRouter');
const pointsInteretRouter = require('./routes/PointsInteretRoute');
const userRouter = require('./routes/UserRouter');

// const importcompteurRoute = require('./BackendGTI525/routes/routes-compteurs/compteurRoute'); // importation des routes des compteurs
const importRoutereseauCyclabe = require('./BackendGTI525/routes/routes-cyclables/reseau_cyclable');
const importeRouteFontaine = require('./BackendGTI525/routes/route-fontaine/routeFontaine');
const importeRouteTerritoire = require('./BackendGTI525/routes/routes-territoires/routes-territoires')

const importroutetest = require('./BackendGTI525//routes/routetest/routeDuTest');


/** utilisation de la racine de routes par l'API rest */
// app.use(urlBase,importcompteurRoute);
app.use(urlBase,importRoutereseauCyclabe);
app.use(urlBase,importeRouteFontaine);
app.use(urlBase,importeRouteTerritoire);
app.use(urlBase,importroutetest);

app.use(urlBase, compteursRoute);
app.use(urlBase, pisteRoute);
app.use(urlBase, userRouter);

app.use(frontEndRouter);
app.use(urlBase, pointsInteretRouter)
