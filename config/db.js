const sequelize = require('sequelize');

const connection = new sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
})

async function testConnection() {
    try {
        await connection.authenticate();
        console.log('Conectado ao banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
    }
}

testConnection();
const db = {};

db.connection = connection;
db.sequelize = sequelize;
db.models = {};
db.models.User = require("../models/User")(connection, sequelize);

module.exports = db;