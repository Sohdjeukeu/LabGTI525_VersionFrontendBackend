const modulePath = require('path');
const modulefs = require('fs');

module.exports.demarrerApplicationWeb =(req,res,next)=>{
      const url_indexhtml = modulePath.join(__dirname,'..','public','html','index.html');
      const lire_indexhtml= modulefs.createReadStream(url_indexhtml,'utf-8');
      lire_indexhtml.on('error', (err) => {
            if (err.code === 'ENOENT') {
              res.statusCode = 404;
              res.end('File not found');
            } else {
              res.statusCode = 500;
              res.end('Internal server error');
            }
          });
       res.writeHead(200,{'content-type':'text/html'})
       lire_indexhtml.pipe(res);
}


