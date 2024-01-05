const modelReseauCyclable= require('../../models/reseau_cyclable');


// afficher une seule piste selon son id
module.exports.afficherUnePisteCyclableSpecifique = async (req,res,next)=>{
    //  console.log(req.query.param);

      await modelReseauCyclable.find({'properties.ID_CYCL': req.params.id})
     .then(pisteCyclableTrouve=>res.status(200).json(pisteCyclableTrouve))
     .catch(error=>res.status(404).json({error}));
}