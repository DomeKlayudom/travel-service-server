const Traveller = require('./../models/traveller.model.js');
const path = require('path');
const multer = require('multer');
const exp = require('constants');
const fs = require('fs');

exports.checkLoginTraveller = async (req, res) => {
    try {
        const result = await Traveller.findOne({
            where: {
                travellerEmail: req.params.travellerEmail,
                travellerPassword: req.params.travellerPassword
            }
        });
        if (result) {
            res.status(200).json({
                message: 'Traveller login successfully',
                data: result
            });
        } else {
            res.status(404).json({
                message: 'Traveller not found',
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createTraveller = async (req, res) => {
    try {

        let data = {
            ...req.body,
            travellerImage: req.file ? req.file.path.replace("images\\traveller\\", "") : "",
        }
        const result = await Traveller.create(data);
        res.status(201).json({
            message: 'Traveller created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.editTraveller = async (req, res) => {
    try {
        let data = {
            ...req.body,
        }
        if (req.file) {
            const traveller = await Traveller.findOne({
                where: {
                    travellerId: req.params.travellerId
                }
            });
            if (traveller.travellerImage) {
                const oldImagePath = "images\\traveller\\" + traveller.travellerImage;
                fs.unlink(oldImagePath,(err)=>{
                    console.log(err);
                });
            }

            data.travellerImage = req.file.path.replace("images\\traveller\\", "");
        }else{
            delete data.travellerImage;
        }


        const result = await Traveller.update(data, {
            where: {
                travellerId: req.params.travellerId
            }
        });
        res.status(200).json({
            message: 'Traveller updated successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/traveller');
    },
    filename: (req, file, cb) => {
        cb(null, 'traveller_' + Math.floor(Math.random() * Date.now()) + path.extname(file.originalname));
    }
});

exports.uploadTraveller = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb('Give proper files formate to upload');
    }
}).single('travellerImage');

