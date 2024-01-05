const express = require('express');
const app = express();
const port = 8080;

app.listen(port, ()=>{
    console.log('Mon serveur en ligne')
})

const urlBase = '/gti525/v1/';

app.get('/', (req, res)=>{

});
app.get(urlBase, (req, res)=>{
    res.send('Coucou, je suis la première version de l\'API');
});
const compteurRoute = require('../routes/CompteurRoute');
const pisteRoute = require('../routes/PisteRoute');
const pointIneteretRoute = require('../routes/PointInteretRoute');


app.use(urlBase, compteurRoute);
app.use(urlBase, pisteRoute);
app.use(urlBase, pointIneteretRoute);
