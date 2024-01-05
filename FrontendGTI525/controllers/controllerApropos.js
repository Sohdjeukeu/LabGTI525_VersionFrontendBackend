const modulePath = require('path');
const modulefs = require('fs');

module.exports.afficherPageApropos =(req,res,next)=>{
      const url_aproposhtml = modulePath.join(__dirname,'..','public','html','index.html');
      const lire_aproposhtml= modulefs.createReadStream(url_aproposhtml,'utf-8');
      lire_aproposhtml.on('error', (err) => {
            if (err.code === 'ENOENT') {
              res.statusCode = 404;
              res.end('File not found');
            } else {
              res.statusCode = 500;
              res.end('Internal server error');
            }
          });
       res.writeHead(200,{'content-type':'text/html'})
       lire_aproposhtml.pipe(res);
}


