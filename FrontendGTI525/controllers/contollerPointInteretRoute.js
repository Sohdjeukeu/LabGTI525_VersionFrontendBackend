const modulePath = require('path');
const modulefs = require('fs');

module.exports.afficherPagePointsInterets =(req,res,next)=>{

      const url_PointsInteretshtml = modulePath.join(__dirname,'..','public','html','pointsInterets.html');
      
      const lire_PointsInteretshtml= modulefs.createReadStream(url_PointsInteretshtml,'utf-8');

      lire_PointsInteretshtml.on('error', (err) => {
            if (err.code === 'ENOENT') {
              res.statusCode = 404;
              res.end('File not found');
            } else {
              res.statusCode = 500;
              res.end('Internal server error');
            }
          });
       res.writeHead(200,{'content-type':'text/html'})
       lire_PointsInteretshtml.pipe(res);
}


