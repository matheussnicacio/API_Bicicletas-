const sequelize = require('../config/database');

const Bicicleta = require('./Bicicleta');
const Interessado = require('./Interessado');
const Escolha = require('./Escolha');
const EscolhaBicicleta = require('./EscolhaBicicleta');
const Usuario = require('./Usuario');

// Relacionamentos
Interessado.hasMany(Escolha, { 
  foreignKey: 'interessado_id',
  as: 'escolhas' 
});

Escolha.belongsTo(Interessado, { 
  foreignKey: 'interessado_id',
  as: 'interessado' 
});

Escolha.belongsToMany(Bicicleta, { 
  through: EscolhaBicicleta, 
  foreignKey: 'escolha_id', 
  otherKey: 'bicicleta_id',
  as: 'bicicletas' 
});

Bicicleta.belongsToMany(Escolha, { 
  through: EscolhaBicicleta, 
  foreignKey: 'bicicleta_id', 
  otherKey: 'escolha_id',
  as: 'escolhas'
});

module.exports = {
  sequelize,
  Bicicleta,
  Interessado,
  Escolha,
  EscolhaBicicleta,
  Usuario
};