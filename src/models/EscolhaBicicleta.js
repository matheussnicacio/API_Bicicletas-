const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EscolhaBicicleta = sequelize.define('EscolhaBicicleta', {
  escolha_id: { type: DataTypes.INTEGER, allowNull: false },
  bicicleta_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'escolha_bicicleta',
  timestamps: true
});

module.exports = EscolhaBicicleta;
