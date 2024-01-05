const Compteur = require("../modeles/model.compteur");
const TousLesCompteursVelo = require("../modeles/model.touslescompteursvelo");
const moment = require("moment");

const exclus = { _id: 0, __v: 0 };

async function getCompteurID(req, res) {
    try {
        const id = parseInt(req.params.id);
        const unCompteur = await Compteur.findOne({ ID: id }, exclus);
        res.status(200).json(unCompteur);
    } catch (e) {
        res.status(500).json(e.message);
    }
}

async function getCompteurIDPassages(req, res) {
    try {
        let id = req.params.id;
        const debut = req.query.debut;
        const fin = req.query.fin;
        const intervalle = req.query.intervalle || "jour";
        const limite = parseInt(req.query.limite);
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * limite;
        const endIndex = page * limite;

        const format = 'YYYY-MM-DD HH:mm:ss'
        const passages = {};

        let dateDebut = '';
        let dateFin = '';

        const filtre = {};

        if (debut) {
            dateDebut = moment(debut).startOf('day').format(format);
        }
        
        if (fin) {
            dateFin = moment(fin).set('hour', 23).format(format);
        }

        if (debut || fin) {
            filtre.Date = { $gte: dateDebut, $lte: dateFin };
        }

        const periode = []
        
        const longueurFiltre = await TousLesCompteursVelo.countDocuments(filtre).exec();
        // https://www.youtube.com/watch?v=LlGS8lJXRPs&ab_channel=ProgrammingExperience
        // passages.infos = await Compteur_2019.aggregate([
        //     {$match: {id: {$gte: 0}}},
        //     {$lookup:{from: "Compteur_2020",localField: "id",foreignField: "Date",as: "compteur_2020" }},
        //     {$unwind: "$compteur_2020"},
        //     {$project: {"compteur_2020.Date": 1, "compteur_2020.id": 1}}
        //     // {$lookup:{from: "Compteur_2022",localField: "_id",foreignField: "Date",as: "compteur2022" }},
        //     // {$unwind: "$compteur2022"},
        //     // {$project: {"compteur2022.Date": 1, 'compteur2022.id':1}}
        // ])
        // console.log(passages.infos);
        passages.infos = await TousLesCompteursVelo.find(filtre, {Date:1, _id:0, [id]:1}).sort({Date: 1});
        const nbPassages = []
        for (const un of passages.infos) {
            nbPassages.unshift(Object.values(un)[2][id]);
            // nbPassages.push(moment(Object.values(un)[2]['Date']).endOf('month').format('DD'));   // pour savoir le nb de jours par mois (28,29,30,31)
            // nbPassages.push(moment(Object.values(un)[2]['Date']).daysInMonth());   // pour savoir le nb de jours par mois (28,29,30,31)
        }
        // console.log(nbPassages);
        // res.status(200).json(nbPassages);
        const nbPassagesParIntervalle = []
        if (intervalle == "jour") {
            const nbJours = longueurFiltre/24
            for (i=1; i<=nbJours; i++){
                periode.push(i)
                let pass = 0
                if (nbPassages.length<24) {
                    for (let j=0; j<nbPassages.length; j++) {
                        pass += parseInt(nbPassages.pop())
                    }
                } else {
                    for (let j=0; j<24; j++) {
                        pass += parseInt(nbPassages.pop())
                    }
                }
                nbPassagesParIntervalle.push(pass)
            }
        }
        if (intervalle == "semaine") {
            const nbSemaine = Math.ceil((longueurFiltre/24)/7)
            for (i=1; i<=nbSemaine; i++){
                periode.push(i)
                let pass = 0
                if (nbPassages.length<168) {
                    for (let j=0; j<nbPassages.length; j++) {
                        pass += parseInt(nbPassages.pop())
                    }
                } else {
                    for (let j=0; j<168; j++) {
                        pass += parseInt(nbPassages.pop())
                    }
                }
                nbPassagesParIntervalle.push(pass)
            }
        }
        if (intervalle == "mois") {
            const nbMois = Math.ceil(((longueurFiltre/24)/365)*12)
            for (let i=1; i<=nbMois; i++){
                periode.push(i)
                let pass = 0
                if (nbPassages.length<672) {
                    for (let j=0; j<nbPassages.length; j++) {
                        pass += parseInt(nbPassages.pop())
                    }
                } else {
                    for (let j=0; j<672; j++) {
                        pass += parseInt(nbPassages.pop())
                    }
                }
                nbPassagesParIntervalle.push(pass)
            }
        }
        
        const nbElements = passages.infos.length;
        
        passages.stats = {
            nb_éléments_affichés: nbElements,
            longueur_filtre: longueurFiltre+" heures",
            periode: periode,
            passages_par_intervalle: nbPassagesParIntervalle
        }
        if (endIndex < longueurFiltre) {
            passages.suivant = {
                page: page + 1,
                limite: limite,
            }
        }
        if (startIndex > 0 && startIndex < longueurFiltre) {
            passages.precedent = {
                page: page - 1,
                limite: limite,
            }
        }
        res.status(200).json(passages);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
};
async function getAllCompteurs(req, res) {
    try {
        const limite = parseInt(req.query.limite);
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * limite;
        const endIndex = page * limite;
        const implantation = parseInt(req.query.implantation);
        const nom = req.query.nom;
        const nomRegex = new RegExp(nom, 'i'); // 'i' for case-insensitive or 's' for case-sensitive


        const resultats = {};

        const filtre = {};
        if (nom) {
            filtre.Nom = nomRegex;
        }
        if (!isNaN(implantation)) {
            filtre.Annee_implante = { $gte: implantation };
        }

        resultats.resultats = await Compteur.find(filtre, exclus).limit(limite).skip(startIndex)


        const longueurFiltre = await Compteur.countDocuments(filtre);
        const nbElements = resultats.resultats.length;
        const elementsRestant = longueurFiltre - endIndex;
        const pagesTotal = Math.ceil(longueurFiltre / limite)

        resultats.stats = {
            nb_éléments_affichés: nbElements,
            éléments_restants: elementsRestant,
            longueur_filtre: longueurFiltre,
            pages_total: pagesTotal,
            pagination: "page " + page + " / " + pagesTotal
        }
       
        if (elementsRestant < 0) {
            resultats.stats.éléments_restants = 0
        } else {
            resultats.stats.éléments_restants = elementsRestant
        }

        // Pagination
        if (endIndex < longueurFiltre) {
            resultats.suivant = {
                page: page + 1,
                limite: limite,
            }
        }
        if (startIndex >= 0 && startIndex < longueurFiltre) {
            resultats.precedent = {
                page: page - 1,
                limite: limite,
            }
        }
        res.status(200).json(resultats);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
};
// Source: https://www.youtube.com/watch?v=ZX3qt0UWifc&ab_channel=WebDevSimplified,  https://www.youtube.com/watch?v=DZBGEVgL2eE&ab_channel=WebDevSimplified
module.exports = {getAllCompteurs, getCompteurID, getCompteurIDPassages}