const express = require("express");
// const Territoire = require("../models/territoire");
const moduleCsvToJson = require('csvtojson');
// const dbConnectLabo = require("../configuration/dbConnectLabo")

// dbConnectLabo();

const router = express.Router();
// module.exports.afficherTousLesPistesCyclables = (req,res,next)=>{
//        modelReseauCyclable.find()
//       .then(resultat=>{
//           res.status(200).json(resultat);
//           console.log(resultat);
//       })
//       .catch(error=>res.status(400).json({error}))
// }






router.get('/piste', async (req, res) => {
    // console.log("test");
    await Territoire.findOne({ _id: req.params.id })
        .then(pisteCyclableTrouve => res.status(200).json(pisteCyclableTrouve))
        .catch(error => res.status(404).json({ error }));
})
module.exports = router;