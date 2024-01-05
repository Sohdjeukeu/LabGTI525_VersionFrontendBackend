const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const mongoose = require("mongoose")
const db = mongoose.connection;

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

const dbConnectBD = () => {
    mongoose.connect(process.env.DB);
    try {
        db.on("connected", () => {
            console.log(`Connexion à MongoDB réussie à ${process.env.MONGO_DATABASE}`);
        });
        db.on("error", () => {
            console.log(`Erreur lors de la connexion à la BDD ${process.env.MONGO_DATABASE}`);
        });
        db.on("disconnected", () => {
            console.log(`Connexion à MongoDB terminée ${process.env.MONGO_DATABASE}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(-1)
    }
}

module.exports = dbConnectBD;