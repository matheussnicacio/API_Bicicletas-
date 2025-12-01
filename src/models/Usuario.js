const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  nome: DataTypes.STRING,
  email: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'usuarios',
  timestamps: true
});

module.exports = Usuario;
