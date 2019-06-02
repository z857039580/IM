const Sequelize = require('sequelize');
const sequelizeDB = new Sequelize('wechat','admin','123456',
    {
        'dialect': 'mysql',
        'host': 'localhost',
        'port': 3306
    });
exports.Sequelize = Sequelize;
exports.sequelizeDB = sequelizeDB;

