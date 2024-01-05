const moduleExpress = require('express'); // importation du module expresse 
const monRouter = moduleExpress.Router();  // creation du router qui est une mini application express

const controleurTest = require('../../controllers/controllertest/tester');


monRouter.get('/test',controleurTest.testerrequte);


module.exports = monRouter;