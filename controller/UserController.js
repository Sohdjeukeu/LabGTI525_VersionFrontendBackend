const User = require('../modeles/model.utilisateur')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function register(req, res, next) {

    req.body.token = await generateToken(req.body.userName)
    req.body.motPasse = await bcrypt.hash(req.body.motPasse, 10)
    req.body.isConnected = true
    console.log(req.body)
    const user = User(req.body)

    try {
        const oldUser = await User.findOne({userName: req.body.userName})
        if (oldUser !== null) {
            return res.status(401).json({statut: 'echec', message: "Ce nom d'utilisateur existe déja"})
        }
        const newUser = await user.save()
        res.status(200).json({statut: 'success', message: 'Vous bien inscrit. Merci!!!', user: newUser})
    } catch (error) {
        res.status(500).json({statut: 'echec', message: +error.message})
    }
    next()
}

async function login(req, res, next) {
    const user = req.body
    try {
        const newUser = await User.findOne({userName: user.userName})
        const isPasswordValid = await bcrypt.compareSync(user.motPasse, newUser.motPasse)
        const isTokenValid = jwt.verify(newUser.token, process.env.TOKEN_KEY)
        if (!(newUser && isPasswordValid && isTokenValid)) return res.status(401).json({
            statut: 'echec', message: "UserName ou mot de passe incorrect"
        })
        res.status(200).json({statut: 'success', message: "Bienvenue " + newUser.prenom, user: newUser})
    } catch (e) {
        res.status(500).json({statut: 'echec', message: "UserName ou mot de passe incorrect"})
    }

    // next()
}



async function generateToken(userName) {
    return jwt.sign({userName: userName}, process.env.TOKEN_KEY)
}

module.exports = {register, login}