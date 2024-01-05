const mongoose = require('mongoose')

const utilisateurShema = mongoose.Schema({
    prenom: {type: String},
    nom: {type: String},
    userName: {type: String},
    motPasse: {type: String},
    token: {type: String},
    isConnected: {type: Boolean}
})

const Utilisateur = mongoose.model('utilisateur', utilisateurShema)
module.exports = Utilisateur