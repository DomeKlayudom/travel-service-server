const Sequelize = require('sequelize');
const sequelize = require('./../db/db.js');

const Travel = sequelize.define('travel_tb', {
    travelId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "travelId"
    },
    travelPlace: {
        type: Sequelize.STRING(200),
        allowNull: false,
        field: "travelPlace"
    },
    travelStartDate: {
        type: Sequelize.STRING(30),
        allowNull: false,
        field: "travelStartDate"
    },
    travelEndDate: {
        type: Sequelize.STRING(30),
        allowNull: false,
        field: "travelEndDate"
    },
    travelCostTotal: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        field: "travelCostTotal"
    },
    travellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "travellerId"
    },
},
{
    tableName: "travel_tb",
    timestamps: false,
    freezeTableName: true
});

module.exports = Travel;
