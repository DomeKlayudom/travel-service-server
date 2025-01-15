const travellerCtrl = require('./../controllers/traveller.controller.js');

const express = require('express');
const router = express.Router();

router.post("/",travellerCtrl.createTraveller);

router.get("/:travellerEmail/:travellerPassword",travellerCtrl.checkLoginTraveller);

router.put("/:travellerId",travellerCtrl.editTraveller);

module.exports = router;