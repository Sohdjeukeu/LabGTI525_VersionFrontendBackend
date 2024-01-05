const express = require('express');
const fs = require("fs");
const frontEndRouter = express.Router();


frontEndRouter.get('/', (req, res)=>{
    const fichierHtml = fs.readFileSync( process.cwd()+'\\public\\html\\index.html', 'utf-8');
    res.send(fichierHtml)
    console.log(process.cwd()+'\\styles\\')

});

frontEndRouter.get('/itineraire', (req, res)=>{
    const fichierHtml = fs.readFileSync( process.cwd()+'\\public\\html\\itineraire.html', 'utf-8');
    res.send(fichierHtml)
});


frontEndRouter.get('/statistiques', (req, res)=>{
    const fichierHtml = fs.readFileSync( process.cwd()+'\\public\\html\\statistiques.html', 'utf-8');
    res.send(fichierHtml)
});

frontEndRouter.get('/pointsdinteret', (req, res)=>{
    const fichierHtml = fs.readFileSync( process.cwd()+'\\public\\html\\pointsInterets.html', 'utf-8');
    res.send(fichierHtml)
});
frontEndRouter.get('/pointsdinteret/:id', (req, res)=>{
    const fichierHtml = fs.readFileSync( process.cwd()+'\\public\\html\\pointsInterets.html', 'utf-8');
    res.send(fichierHtml)
});


frontEndRouter.get('/equipe', (req, res)=>{
    const fichierHtml = fs.readFileSync( process.cwd()+'\\public\\html\\equipe.html', 'utf-8');
    res.send(fichierHtml)
});

frontEndRouter.get('/apropos', (req, res)=>{
    const fichierHtml = fs.readFileSync( process.cwd()+'\\public\\html\\apropos.html', 'utf-8');
    res.send(fichierHtml)
});
frontEndRouter.get('/inscription', (req, res)=>{
    const fichierHtml = fs.readFileSync( process.cwd()+'\\public\\html\\inscription.html', 'utf-8');
    res.send(fichierHtml)
});

frontEndRouter.use('/public', express.static(process.cwd()+'\\public\\'))
frontEndRouter.use('/data', express.static(process.cwd()+'\\data\\'))
frontEndRouter.use('/routes', express.static(process.cwd()+'\\routes\\'))

module.exports = frontEndRouter