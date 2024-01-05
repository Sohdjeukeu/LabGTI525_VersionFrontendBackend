const mongoose = require('mongoose');

const schemaCompteur = mongoose.Schema({
    id: { type: Number, required: true }, 
    nom: { type: String, required: true },
    statut: { type: String, required: true }, 
    latitude: { type: Number, required: true }, 
    longitude: { type: Number, required: true }, 
    implantation: { type: Number, required: true }   
})

module.exports = mongoose.model('Compteur', schemaCompteur);