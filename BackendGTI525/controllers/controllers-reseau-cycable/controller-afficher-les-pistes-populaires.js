const modelPassage = require('../../models/model-passage');
const modelRecyclabe = require('../../models/reseau_cyclable');
const moment = require('moment');


// afficher tous les  pistes cyclabes 
module.exports.afficherLesPistesCyclablesPopulaire = async (req, res) => {

    // accédons aux parametres de la requetes 
    const debut = req.query.populaireDebut;
    const fin = req.query.populaireFin;

    const arrondissementsPopulaires = await modelPassage.aggregate([
        {
          $match: {
            date: {
              $gte: debut,
              $lte: fin,
            },
          },
        },
        {
          $group: {
            _id: "$arrondissement",
            popularite: { $avg: { $divide: ['$nombre_passages', '$nombreCompteurs'] } }
          }
        }
      ]);

   const top3Arrondissements = arrondissementsPopulaires
  .sort((a, b) => b.popularite - a.popularite)
  .slice(0, 3)
  .map(arrondissement => arrondissement._id);

  // Étape 3: Récupération des pistes cyclables qui passent par ces arrondissements
  const pistesCyclables = await modelRecyclabe.find({
  geometry: {
    $geoIntersects: {
      $geometry: {
        type: { type: String, required: true },
        coordinates: { type: [[Number]], required: true }
      }
    }
  },
  arrondissement:{ $in: top3Arrondissements}
});

 console.info(pistesCyclables)
 res.status(200).send({pistesCyclables});
   
      
// res.status(200).json(pistesPopulaires);
//res.status(200).send({Message:"ok"});
}


