const csvToJson = require("csvtojson");
csvToJson().fromFile(process.cwd() + '\\data\\compteurs.csv').then(compteurs => {
    csvToJson().fromFile(process.cwd() + '\\data\\comptage_velo_2019.csv').then(passages=>{

        // for (let passageKey in passages){
        //     console.log(passages[0])
        // }
        console.log(Object.keys(passages[0]).length)
        console.log(passages.length)
    })

});