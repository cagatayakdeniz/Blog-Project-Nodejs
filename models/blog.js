const { DataTypes } = require('sequelize');
const sequelize = require('../data/data');

const Blog = sequelize.define('blog', {
    blogid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    baslik: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aciklama: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    resim: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anasayfa: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    onay: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    eklenmeTarihi: {
        type: DataTypes.DATE,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    timestamps: false,
    validate: {
        AnasayfaOnayKontrol(){
            if(this.anasayfa && !this.onay){
                throw new Error('Anasayfaya eklemek için onay kısmının işaretlenmesi gerekiyor');
            }
        }
    }
});

CreateTable = async()=>{
    await Blog.sync();
}
CreateTable();

module.exports = Blog;