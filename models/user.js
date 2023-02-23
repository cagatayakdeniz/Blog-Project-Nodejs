const { DataTypes } = require('sequelize');
const sequelize = require('../data/data');

const User = sequelize.define('user', {
    adsoyad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Ad Soyad boş geçilemez."
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "E-mail boş geçilemez."
            },
            isEmail: {
                msg: "E-mail formatına uygun değil."
            }
        }
    },
    sifre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleid: {
        type: DataTypes.INTEGER,
        allowNull:true
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpirationTime: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    timestamps: true
});

CreateTable = async()=>{
    await User.sync();
}
CreateTable();

module.exports = User;