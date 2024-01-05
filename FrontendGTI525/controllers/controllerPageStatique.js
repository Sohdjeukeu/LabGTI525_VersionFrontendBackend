const modulePath = require('path');
const modulefs = require('fs');

module.exports.afficherPageStatistique =(req,res,next)=>{

      const url_pagestatistiquehtml = modulePath.join(__dirname,'..','public','html','statistiques.html');
      const lire_pagestatistiquehtml= modulefs.createReadStream(url_pagestatistiquehtml,'utf-8');
      
      //lecture du fichier 
      lire_pagestatistiquehtml.on('error', (err) => {
            if (err.code === 'ENOENT') {
              res.statusCode = 404;
              res.end('File not found');
            } else {
              res.statusCode = 500;
              res.end('Internal server error');
            }
          });
        res.writeHead(200,{'content-type':'text/html'})
       
       lire_pagestatistiquehtml.pipe(res);
      
}


