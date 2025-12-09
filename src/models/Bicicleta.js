const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bicicleta = sequelize.define('Bicicleta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  marca: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numero_serie: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  cor: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  altura_minima: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false
  },
  quadro: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'bicicletas',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Bicicleta;