module.exports.testerrequte = (req,res, next)=>{

    console.log(req.query);

    // console.log("ma requete est bnne ");
    res.send({message:"ok"});

}
