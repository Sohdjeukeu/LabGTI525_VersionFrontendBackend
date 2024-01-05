const modelCompteur= require('../../models/model-passage.js');
const moduleCsvToJson = require('csvtojson');
const modulepath = require('path');

module.exports.insererCompteurEssaie = async (req,res,next)=>{
  try
    {
        const urlFichier = modulepath.join(__dirname,'../../','public','data','comptage_velo_2020.csv'); 
       // const urlFichier1 = modulepath.join(process.cwd(),'public','/data/comptage_velo_2019.csv');  process.cwd() est uilisé avec le repertoire courant
          const jsonArray = await moduleCsvToJson().fromFile(urlFichier);

          for(let i=0; i<jsonArray.length;i++){

            for(const idCompteur in jsonArray[i]){

             const nombrePassage = jsonArray[i][idCompteur];
                        
               if(idCompteur !== "Date" )
                  {
                    // console.log("idCompteur :"+idCompteur+" nombrePassage: "+nombrePassage+ " Date: "+jsonArray[i]["Date"]);
                    // console.log("idCompteur :"+idCompteur+" nombrePassage: "+nombrePassage+ " Date: "+jsonArray[i]["Date"]);

                    const insertResultat = await modelCompteur.create({
                      "idCompteur" :idCompteur, 
                      "nombrePassage":nombrePassage,
                      "Date":jsonArray[i]["Date"]}
                      );
                    console.log(insertResultat);
                  }
            }
          }
          console.log(jsonArray.length);
          
          res.status(200).send({message:"OK"});
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({error});
    }
  }

// deuxiement fonction 