const FontaineModel = require('../modeles/model.fontaine');


/**
 * Ajouter un point d'intérêts dans la base de données
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

async function addFontaine(req, res, next) {
    const pointInteret = FontaineModel(req.body)
    try {
        const nouveauPI = await pointInteret.save();
        res.status(200).json({
            statut: 'success',
            message: `Point d'intérêt ajouté à la base de données avec l ID ${nouveauPI.ID}`,
            data: nouveauPI
        });
    } catch (error) {
        res.status(500).json({statut: 'echec', message: error.message})
    }
}

/**
 * Permet de récuprer tous les points d'intérêts
 * @param req les requêtes
 * @param res les reponses envoyés
 * @param next exécuter la prochaine fonction
 * @returns {Promise<void>} le retour,
 */
async function getAllFontaine(req, res) {
    /**
     * les différents paramètres de recherche de poitns d'intérêts
     * @type {string}
     */

    const limite = req.query.limite || 'all'
    const page = req.query.page || 1;//page actuelle
    const type = req.query.type  // type de points d'intérêts
    const territoire = req.query.territoire; //le territoire
    const nom = req.query.nom

    const filter = {}
    if (type) {
        filter['Type'] = RegExp(type, 'i');
    }
    if (territoire) {
        filter['Arrondissement'] = territoire;
    }
    if (nom) {
        filter['Nom_parc_lieu'] = RegExp(nom, 'i');
        ;
    }

    try {

        let fontaines = {};

        if (limite == 'all') {
            fontaines.data = await FontaineModel.find(filter)
        } else {
            fontaines.data = await FontaineModel.find(filter).limit(limite).skip((page - 1) * limite);
        }
        fontaines.taille = await FontaineModel.find(filter).count()
        res.status(200).send({statut: 'success', data: fontaines});
    } catch (error) {
        res.status(500).json({'message': error.message})
        console.log({statut: 'echec', message: error.message});
    }
}

/**
 * Permet de renvoyer un point d'intérets avec in ID passé en paramètre
 * @param req les requêtes
 * @param res les reponses envoyés
 * @param next exécuter la prochaine fonction
 * @returns {Promise<void>} le retour,
 */
async function getFontaine(req, res, next) {
    try {
        const fontaine = await FontaineModel.findOne({'ID': req.params.id});
        if (fontaine == null) {
            res.status(404).send({statut: 'echec', message: 'Aucune fontaine trouvée'})
        } else {
            res.status(200).json({statut: 'success', data: fontaine});
        }
    } catch (error) {
        res.status(500).json({statut: 'echec', message: error.message})
    }
    next()
}

/**
 *Mettre à jour un point d'intérêt avec son ID en passants les informations à modifier à travers le body
 * par exemple pour modifier le nom, on recupère par req.body.nom
 * @param req les requêtes
 * @param res les reponses envoyés
 * @param next exécuter la prochaine fonction
 * @returns {Promise<void>} le retour,
 */
async function updateFontaine(req, res, next) {
    try {
        await FontaineModel.updateOne({'ID': req.body.ID}, {$set: req.body});
        const updatedFontaine = await FontaineModel.findOne({'ID': req.body.ID});
        res.status(200).json({
            statut: 'success',
            message: "Point d'intérêt mis à jour avec succès",
            data: updatedFontaine
        });
        console.log(res.statusCode)
    } catch (error) {
        res.status(500).json({statut: 'echec', message: error.message, body: req.body})
    }
    next()
}

/**
 *Supprimer un point d'intérêt à partir de son ID
 * @param req les requêtes
 * @param res les reponses envoyés
 * @param next exécuter la prochaine fonction
 * @returns {Promise<void>} le retour,
 */
async function deleteFontaine(req, res, next) {
    try {
        await FontaineModel.deleteOne({'ID': req.params.id});
        const updatedFontaine = await FontaineModel.findOne({'ID': req.params.id});
        res.status(200).json({statut: 'success', message: "Point d'intérêt supprimé avec succès"});
    } catch (error) {
        res.status(500).json({statut: 'echec', message: error.message})
    }
    next()
}

module.exports = {addFontaine, getAllFontaine, getFontaine, updateFontaine, deleteFontaine}