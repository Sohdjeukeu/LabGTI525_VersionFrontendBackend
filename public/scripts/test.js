const csvToJson = require('csvtojson');
const ModeleCompteur = require('../../modele/compteur')

async function test(req, res) {
    const nouveauxCompteurs = []
    try {
        const compteurs = await csvToJson().fromFile(process.cwd() + '\\data\\compteurs.csv')
        const lesPassages = await csvToJson().fromFile(process.cwd() + '\\data\\comptage_velo_2022.csv')
        let k = 0
        for (const compteur of compteurs) {
            const passages = []
            for (let i = 0; i < lesPassages.length; i++) {

                // if (i === 2)
                //     break
                const passage = {}
                for (const idCompteur in lesPassages[i]) {

                    if (compteur.ID === idCompteur) {
                        //   console.log("idCompteur trouvé" +idCompteur)
                        passage.NombrePassage = lesPassages[i][idCompteur]
                        passage.Date = lesPassages[i]['Date']
                        passages.push(passage)
                        break
                    }
                    compteur.passages = passages

                }


            }
            const newCompteur = await ModeleCompteur.findOne({ID: compteur.ID})
            newCompteur.passages.push(...passages)
            const maj = await ModeleCompteur.updateOne({ID: compteur.ID}, {$set: {passages: newCompteur.passages}})
            console.log(maj)


        }
        // console.log(nouveauxCompteurs)
        // console.log(nouveauxCompteurs.length)
        // const result = await ModeleCompteur.insertMany(nouveauxCompteurs)

        res.status(200).json({test: 'succes'})
        console.log('test marche')
    } catch (e) {
        res.status(500).json({test: e.message})
    }
    /* fetch('/gti525/v1/compteur').then(()=>{
         csvToJson().fromFile(process.cwd() + '\\data\\compteurs.csv').then(compteurs => {

             csvToJson().fromFile(process.cwd() + '\\data\\comptage_velo_2019.csv').then(async lesPassages => {
                 // console.log(passages)
                 const nouveauxCompteurs = []
                 let k = 0
                .then(()=>{
                     console.log('sucessès')
                 }).catch((error)=>{
                     console.log('Erreur : ',error)
                 })

                 // console.log(JSON.stringify(compteurs[2].passages))
                 // })
                 // compteurs.forEach(compteur => {
                 //
                 //     const passages = []
                 //     for (let i = 0; i < 5; i++) {
                 //         const passage = {}
                 //         const date = '2023-12-10'
                 //         const nombrePassage = 10
                 //         passage.date = date
                 //         passage.nombrePassage = nombrePassage
                 //         passages.push(passage)
                 //     }
                 //
                 //     compteur.passages = passages
                 //
             })

             // console.log(datas[0].passages)

         })

     }
     )*/
}

module.exports = {test}