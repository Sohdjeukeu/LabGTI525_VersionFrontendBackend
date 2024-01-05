const modulePath = require('path');
const modulecsvjs = require('csvtojson');
const modulefs = require('fs');

module.exports.afficherPageItineraire =(req,res,next)=>{

      const url_itinerairehtml = modulePath.join(__dirname,'..','public','html','itineraire.html');
      const lire_itinerairehtml = modulefs.createReadStream(url_itinerairehtml,'utf-8');

      lire_itinerairehtml.on('error', (err) => {
            if (err.code === 'ENOENT') {
              res.statusCode = 404;
              res.end('File not found');
            } else {
              res.statusCode = 500;
              res.end('Internal server error');
            }
          });
       res.writeHead(200,{'content-type':'text/html'})
        lire_itinerairehtml.pipe(res);
}


