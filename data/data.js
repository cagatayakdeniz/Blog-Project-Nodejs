const mysql = require("mysql2");
const config = require("../config");

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.data.database, config.data.user, config.data.password, {
  host: config.data.host,
  dialect: 'mysql',
});

//test

async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Veri tabanı bağlantısı başarılı');
      } catch (error) {
        console.error('Veri tabanında hata var:', error);
      }
}
connect();

module.exports = sequelize;

// const connection = mysql.createConnection(config.data);

// connection.connect((err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Bağlantı Başarılı");    
//     }
// });

// module.exports = connection.promise();