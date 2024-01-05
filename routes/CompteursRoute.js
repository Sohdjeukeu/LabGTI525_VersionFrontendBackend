const express = require('express');
const {getAllCompteurs, getCompteurID, getCompteurIDPassages} = require('../controller/CompteurController');
const compteursRoute = express.Router();

compteursRoute.get('/compteurs/:id', getCompteurID);
compteursRoute.get('/compteurs/:id/passages', getCompteurIDPassages);
compteursRoute.get('/compteurs', getAllCompteurs);

module.exports = compteursRoute;