const express = require('express');
const {getAllFontaine, getFontaine, updateFontaine, deleteFontaine, addFontaine} = require('../controller/PointInteretController');
const pointInteretRouter = express.Router();

pointInteretRouter.post('/pointsdinteret', addFontaine)
pointInteretRouter.get('/pointsdinteret', getAllFontaine)
pointInteretRouter.get('/pointsdinteret/:id', getFontaine)
pointInteretRouter.patch('/pointsdinteret/:id', updateFontaine)
pointInteretRouter.delete('/pointsdinteret/:id', deleteFontaine)

module.exports = pointInteretRouter
