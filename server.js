// server.js
require('dotenv').config();
const express = require('express');
const app = express();

// Importa a conexão com o banco
const sequelize = require('./src/config/database');

const models = require('./src/models');

// Importa rotas
const bicicletasRoutes = require('./src/routes/bicicletas');
const authRoutes = require('./src/routes/auth');
const interessadosRoutes = require('./src/routes/interessados');
const escolhasRoutes = require('./src/routes/escolhas');

app.use(express.json());

// Rotas
app.use('/api/bicicletas', bicicletasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/interessados', interessadosRoutes);
app.use('/api/escolhas', escolhasRoutes);

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await sequelize.sync(); 
    console.log('✅ Modelos sincronizados com o banco de dados');
    app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));
  } catch (error) {
    console.error('❌ Erro ao conectar ou sincronizar com o banco:', error.message);
  }
})();