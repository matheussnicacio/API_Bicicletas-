const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
require('dotenv').config();

// Registrar usuário
router.post('/register', async (req, res) => {
  const { username, password, nome, email } = req.body;

  try {
    const existingUser = await Usuario.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await Usuario.create({ username, password_hash, nome, email });

    return res.status(201).json({ 
      id: user.id,
      username: user.username,
      nome: user.nome,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});


// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await Usuario.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
      }
  
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(400).json({ message: 'Senha incorreta' });
      }
  
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
  
      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          nome: user.nome,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao fazer login' });
    }
  });
  

module.exports = router;
