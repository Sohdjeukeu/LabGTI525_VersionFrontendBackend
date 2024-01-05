const modelReseauCyclable = require('../../models/reseau_cyclable');
const moment = require('moment');


// afficher tous les  pistes cyclabes 
module.exports.afficherTousLesPistesCyclables = async (req, res) => {

    await modelReseauCyclable.find().then(resultat => {res.status(200).json(resultat);
            console.log(resultat);
        })
        .catch(error => res.status(400).json({ error }))
    const debut = req.query.populaireDebut;
    const fin = req.query.populaireFin;
    const id = parseInt(req.params.id);

    let dateDebut = '';
    let dateFin = '';

    const filtre = {};

    if (debut) {
        dateDebut = moment(debut).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    }

    if (fin) {
        dateFin = moment(fin).set('hour', 23).format('YYYY-MM-DD HH:mm:ss');
    }

    if (debut || fin) {
        filtre.Date = { $gte: dateDebut, $lte: dateFin };
    }
    const mesPistes = {};
    //  mesPistes.features= await modelReseauCyclable.find({Date:{$gte:dateDebut}},{properties:1,_id:0})
    //  mesPistes.features= await modelReseauCyclable.find({Date:{$gte:dateDebut}},{properties:1,_id:0})
    mesPistes.infos = await modelReseauCyclable.find()

    // //res.status(200).json(mesPistes.infos[0].properties.ID_CYCL);
    // res.status(200).json(mesPistes);
}


