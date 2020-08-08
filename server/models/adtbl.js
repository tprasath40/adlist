
const dbConfig = require("../config/db.config.js");
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const adtbl = sequelize.define("adtbl", {

    title: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.TEXT,
      },
  
    price: {
    type: Sequelize.DOUBLE,
    },
  
    posted_date: {
    type: 'TIMESTAMP',
    },
  
  });
  adtbl.sync()
    .then(() => console.log("adtbl table created successfully"))
    .catch(err => console.log("BTW, did you enter wrong database credentials?",err))
    
    module.exports = adtbl;
