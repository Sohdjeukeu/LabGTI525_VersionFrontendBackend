const moduleHttp = require('http');

const monAppImp = require('./MonApplicationWeb'); // importation de l'application dans le serveur

// creation du serveur web  qui doit servir pour notre application Frontale 
 const serveur = moduleHttp.createServer(monAppImp);


 // l'application Frontale et son serveur tourne sur le meme port 8080
 monAppImp.set('port',process.env.PORT || 8080);

 // le serveur doit etre écoute au meme port 
 serveur.listen(process.env.PORT || 8080,()=>{
    console.log('Mon serveur frontend est écouté au port 8080');
 })









/*
const fs =  require('fs');

const app = express();
const port = 8080;

const route = express.Router();
app.listen(port, ()=>{
    console.log('Mon serveur en ligne')
})

const urlBase = '/gti525/v1/';

const compteurRoute = require('../routes/CompteurRoute');
const pisteRoute = require('../routes/PisteRoute');
const pointIneteretRoute = require('../routes/PointInteretRoute');
const frontEndRouter = require('../routes/FrontEndRouter');



app.use(urlBase, compteurRoute);
app.use(urlBase, pisteRoute);
app.use(urlBase, pointIneteretRoute);
app.use(frontEndRouter);
*/