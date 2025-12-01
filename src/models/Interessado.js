const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Interessado = sequelize.define('Interessado', {
  nome: { type: DataTypes.STRING, allowNull: false },
  fone: DataTypes.STRING,
  email: DataTypes.STRING,
  altura_m: { type: DataTypes.DECIMAL(3,2), allowNull: false }
}, {
  tableName: 'interessados',
  timestamps: true
});

module.exports = Interessado;
