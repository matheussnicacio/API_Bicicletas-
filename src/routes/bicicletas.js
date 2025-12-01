const express = require('express');
const router = express.Router();
const { Bicicleta } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');



// GET /api/bicicletas - listar todas
router.get('/', async (req, res) => {
  try {
    const bicicletas = await Bicicleta.findAll();
    res.json(bicicletas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bicicletas/:id - buscar por id
router.get('/:id', async (req, res) => {
  try {
    const bicicleta = await Bicicleta.findByPk(req.params.id);
    if (!bicicleta) return res.status(404).json({ error: 'Bicicleta não encontrada' });
    res.json(bicicleta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bicicletas - criar
router.post('/', async (req, res) => {
  try {
    const bicicleta = await Bicicleta.create(req.body);
    res.status(201).json(bicicleta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/bicicletas/:id - atualizar
router.put('/:id', async (req, res) => {
  try {
    const bicicleta = await Bicicleta.findByPk(req.params.id);
    if (!bicicleta) return res.status(404).json({ error: 'Bicicleta não encontrada' });
    await bicicleta.update(req.body);
    res.json(bicicleta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/bicicletas/:id - deletar
router.delete('/:id', async (req, res) => {
  try {
    const bicicleta = await Bicicleta.findByPk(req.params.id);
    if (!bicicleta) return res.status(404).json({ error: 'Bicicleta não encontrada' });
    await bicicleta.destroy();
    res.json({ message: 'Bicicleta deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
