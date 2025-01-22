const { where } = require('sequelize');
const Travel = require('./../models/travel.model.js');
const path = require('path');
const multer = require('multer');

exports.createTravel = async (req, res) => {
    try {
        const result = await Travel.create(req.body);
        res.status(201).json({
            message: 'Travel created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.editTravel = async (req, res) => {
    try {
        const result = await Travel.update(req.body, {
            where: {
                travelId: req.params.travelId
            }
        });
        res.status(200).json({
            message: 'Travel updated successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTravel = async (req, res) => {
    try {
        const result = await Travel.destroy({
            where: {
                travelId: req.params.travelId
            }
        });
        res.status(200).json({
            message: 'Travel delete successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTravel = async (req, res) => {
    try {
        const result = await Travel.findAll(
            {
                where: {
                    travellerId: req.params.travellerId,
                }
            });
        if (result) {
            res.status(200).json({
                message: 'Traveller get successfully',
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
};

exports.createTravel = async (req, res) => {
    try {
        let data = {
            ...req.body,
            travelImage: req.file.path.replace("images\\travel\\", ""),
        }
        const result = await Travel.create(data);
        res.status(201).json({
            message: 'Travel created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/travel');
    },
    filename: (req, file, cb) => {
        cb(null, 'travel_' + Math.floor(Math.random() * Date.now()) + path.extname(file.originalname));
    }
});

exports.uploadTravel = multer({
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
}).single('travelImage');