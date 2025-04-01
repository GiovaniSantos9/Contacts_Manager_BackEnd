const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const User = sequelize.define('User', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: true }
}, { tableName: 'users' });

module.exports = User;
