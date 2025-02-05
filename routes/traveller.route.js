const travellerCtrl = require('./../controllers/traveller.controller.js');

const express = require('express');
const router = express.Router();

router.post("/",travellerCtrl.uploadTraveller,travellerCtrl.createTraveller);

router.get("/:travellerEmail/:travellerPassword",travellerCtrl.checkLoginTraveller);

router.put("/:travellerId",travellerCtrl.uploadTraveller,travellerCtrl.editTraveller);

module.exports = router;