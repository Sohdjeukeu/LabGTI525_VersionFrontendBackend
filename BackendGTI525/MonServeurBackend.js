const moduleHttp = require('http');

const monApIImp = require('./MonApi') // importation de l'application dans le serveur

// creation du serveur web  qui doit servir pour notre application Frontale 
 const serveurBackend = moduleHttp.createServer(monApIImp);
 //const hostname = process.env.HOSTNAME;
 

 // chageons les variables d'environnement port  et host 
 const numeroPortServeur = process.env.NODE_PORT;
 const hostname =process.env.HOST;

 //console.log(numeroPortServeur);
 //console.log(hostname);

 // l'application Api et son serveur tourne sur le meme port 3000
 monApIImp.set('port', numeroPortServeur);

 // le serveur doit etre écoute au meme port 
 serveurBackend.listen(numeroPortServeur,hostname,()=>{
    console.log('Mon serveur pour Api est écouté au port 3000');
 })



