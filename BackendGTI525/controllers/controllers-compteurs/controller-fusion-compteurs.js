// importons les modeles 
const modelCompteur_2019 = require('../../models/compteur_2019');
const modelCompteur_2020 = require('../../models/compteur_2020');
const modelCompteur_2021 = require('../../models/compteur_2021');
const modelCompteur_2022 = require('../../models/compteur_2022');

module.exports.fusionnerLesCompteurs = async (req,res,next)=>{
try {
            // recupere les documents de la premiere collection 
           const resultatcollectioncompteurs1 = await modelCompteur_2019.find({});


           // recuperer les documents des autres collections 
           const document2020 = await modelCompteur_2019.find({});
           const document2021 = await modelCompteur_2021.find({});
           const document2022 = await modelCompteur_2022.find({});

           // inserer les documents dans la collectiocompteurs1

          resultatcollectioncompteurs1.push(...document2020,...document2021,...document2022);
        //    const resultMerged = await modelCompteur_2019.insertMany(resultatcollectioncompteurs1);
        //    console.log('Fusion réussie :', resultMerged);



        // await modelCompteur_2020.aggregate([/**Étape d'aggregation */]).merge(resultatcollectioncompteurs1);
        // await modelCompteur_2021.aggregate([/**Étape d'aggregation */]).merge(resultatcollectioncompteurs1);
        // await modelCompteur_2022.aggregate([/**Étape d'aggregation */]).merge(resultatcollectioncompteurs1);

        // console.log('Fusion a réussi:',resultatcollectioncompteurs1);

         res.status(201).json(resultatcollectioncompteurs1);
        // console.log(resultatcollectioncompteurs1);

         //res.status(201).send({message:"ok"});
    } catch (error) {
        console.error('Erreur de fusion:',error);
    }
}