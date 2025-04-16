
const { DataTypes } = require("sequelize");

const User = (connection,sequelize) => {
  const User = connection.define('User', {
    nome: { type: DataTypes.STRING, allowNull: false },
    sobrenome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: true }
  }, { tableName: 'users' });
  return User;
}

module.exports = User;
