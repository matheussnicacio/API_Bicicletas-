const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bicicleta = sequelize.define('Bicicleta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numero_serie: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  cor: {
    type: DataTypes.STRING
  },
  quadro: {
    type: DataTypes.INTEGER, // 15, 17 ou 18
    allowNull: false,
    validate: { min: 15, max: 18 }
  },
  altura_minima: {
    type: DataTypes.DECIMAL(3,2),
    allowNull: false,
    validate: { min: 1.50, max: 2.50 }
  }
}, {
  tableName: 'bicicletas',
  timestamps: true
});

module.exports = Bicicleta;
