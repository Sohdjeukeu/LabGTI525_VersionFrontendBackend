const moduleMongoose = require('mongoose');

// Définition du schéma
const passageSchema = moduleMongoose.Schema({
  idCompteur: {
    type: String,
  // required: true,
  // unique:true
  },
  nombrePassage: {
    type: Number,
 // required: true,
  },
  Date: {
    type: String,
   // required: true,
  },
});

module.exports = moduleMongoose.model('Passage', passageSchema);
