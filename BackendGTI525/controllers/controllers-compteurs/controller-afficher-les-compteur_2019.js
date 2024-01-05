const modelCompteur = require('../../models/model-passage');
const moduleCsvToJson = require('csvtojson');
const modulefs = require('fs');
const modulepath = require('path');


module.exports.afficherTousLesCompteurs2019 =  (req,res,next)=>{
    const urlFichier = modulepath.join(__dirname,'../../','public','data','comptage_velo_2019.csv'); // 
   //const urlFichier1 = modulepath.join(/*__dirname*/process.cwd(),'public','/data/comptage_velo_2019.csv'); // process.cwd() est uilisé avec le repertoire courant
    moduleCsvToJson().fromFile(urlFichier)
    .then((resultat)=>{
        console.log(resultat);
        res.status(200).send({resultat});
    }) 
        
}
    // for(const idCompteur in compteurJson[1]){
    // const nombrePassage = compteurJson[1][idCompteur];
    // if(idCompteur !== "Date" )

    //     console.log("idCompteur :"+idCompteur+" nombrePassage: "+nombrePassage+ " Date: "+compteurJson[1]["Date"]);

    // }

//  for(i=0; i<compteurJson.length;i++){

//     for(const idCompteur in compteurJson[i]){
//     const nombrePassage = compteurJson[i][idCompteur];
//     if(idCompteur !== "Date" )
//         console.log("idCompteur :"+idCompteur+" nombrePassage: "+nombrePassage+ " Date: "+compteurJson[i]["Date"]);
//     try {
//         const passage ={idCompteur:"idCompteur",nombrePassage:nombrePassage,Date:compteurJson[i]["Date"]}

//         const insertionResultat = await modelCompteur.insertOne(passage);

//         console.log(insertionResultat);

//         res.status(200).send(insertionResultat);

//         if(i==1){
//             break
//         }

//     } catch (error) {
//               console.error(error.message);
//     }   
//  }
//     }
//         console.log(compteurJson.length);
//        // res.status(200).send({compteurJson}); 
//     });

