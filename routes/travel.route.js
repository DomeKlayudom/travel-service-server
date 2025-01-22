const travelCtrl = require('./../controllers/travel.controller.js');

const express = require('express');
const router = express.Router();

router.post('/',travelCtrl.uploadTravel,travelCtrl.createTravel);

router.put('/:travelId',travelCtrl.editTravel);

router.get('/:travellerId',travelCtrl.getAllTravel);

router.delete('/:travelId',travelCtrl.deleteTravel);

module.exports = router

