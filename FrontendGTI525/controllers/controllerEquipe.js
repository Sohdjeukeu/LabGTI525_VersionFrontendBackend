const modulePath = require('path');
const modulefs = require('fs');

module.exports.afficherPageEquipe =(req,res,next)=>{

      const url_equipehtml = modulePath.join(__dirname,'..','public','html','equipe.html');
      
      const lire_equipehtml= modulefs.createReadStream(url_equipehtml,'utf-8');

      lire_equipehtml.on('error', (err) => {
            if (err.code === 'ENOENT') {
              res.statusCode = 404;
              res.end('File not found');
            } else {
              res.statusCode = 500;
              res.end('Internal server error');
            }
          });
       res.writeHead(200,{'content-type':'text/html'})
       lire_equipehtml.pipe(res);
      
}


