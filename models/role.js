const { DataTypes } = require('sequelize');
const sequelize = require('../data/data');

const Role = sequelize.define('role', {
    roleName: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

CreateTable = async()=>{
    await Role.sync();
}
CreateTable();

module.exports = Role;