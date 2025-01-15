const { where } = require('sequelize');
const Travel = require('./../models/travel.model.js');

exports.createTravel = async (req, res) => {
    try {
        const result = await Travel.create(req.body);
        res.status(201).json({
            message: 'Travel created successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({message : error.message});
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
    } catch (err) {
        res.status(500).json({message : error.message});
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
    } catch (err) {
        res.status(500).json({message : error.message});
    }
};

exports.getAllTravel = async (req, res) => {
    try {
        const result = await Travel.findAll(
            {
                where: {
                    travelerId: req.params.travelerId,
            }
    });
    if (result) {
        res.status(200).json({
            message: 'Traveller get successfully',
            data: result
        });
    }else {
        res.status(404).json({
            message: 'Traveller not found',
            data: null
        });
    }
    } catch (err) {
        res.status(500).json({message : error.message});
    }
};