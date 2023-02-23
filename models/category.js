const { DataTypes } = require('sequelize');
const sequelize = require('../data/data');

const Category = sequelize.define('category', {
    categoryid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

CreateTable = async()=>{
    await Category.sync();
}
CreateTable();

module.exports = Category;