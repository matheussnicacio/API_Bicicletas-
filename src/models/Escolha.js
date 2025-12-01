const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Escolha = sequelize.define('Escolha', {
  interessado_id: { type: DataTypes.INTEGER, allowNull: false },
  data_escolha: { type: DataTypes.DATEONLY, allowNull: false },
  observacoes: DataTypes.TEXT
}, {
  tableName: 'escolha',
  timestamps: true
});

module.exports = Escolha;