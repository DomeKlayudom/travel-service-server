const Traveller = require('./../models/traveller.model.js');

exports.createTraveller = async (req, res) => {
    try {
        const result = await Traveller.create(req.body);
        res.status(201).json({
            message: 'Traveller created successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
};

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
        }else {
            res.status(404).json({
                message: 'Traveller not found',
                data: null
            });
        }
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
}

exports.editTraveller = async (req, res) => {
    try {
        const result = await Traveller.update(req.body, {
            where: {
                travellerId: req.params.travellerId
            }
        });
        req.status(200).json({
            message: 'Traveller updated successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
}

