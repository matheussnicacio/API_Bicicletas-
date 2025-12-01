const { Bicicleta } = require('../models');

// Listar todas as bicicletas ou filtrar por quadro/disponibilidade
async function list(req, res) {
  try {
    const { quadro_inch, disponivel } = req.query;
    const where = {};
    if (quadro_inch) where.quadro_inch = quadro_inch;
    if (disponivel !== undefined) where.disponivel = disponivel === 'true';

    const bikes = await Bicicleta.findAll({ where });
    res.json(bikes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar bicicletas' });
  }
}

// Buscar uma bicicleta pelo ID
async function getOne(req, res) {
  try {
    const bike = await Bicicleta.findByPk(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bicicleta não encontrada' });
    res.json(bike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar bicicleta' });
  }
}

// Criar nova bicicleta
async function create(req, res) {
  try {
    const { codigo_bicicleta, quadro_inch, cor_bicicleta } = req.body;
    if (!codigo_bicicleta || !quadro_inch) {
      return res.status(400).json({ message: 'codigo_bicicleta e quadro_inch são obrigatórios' });
    }

    const bike = await Bicicleta.create({ codigo_bicicleta, quadro_inch, cor_bicicleta });
    res.status(201).json(bike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar bicicleta' });
  }
}

// Atualizar bicicleta
async function update(req, res) {
  try {
    const bike = await Bicicleta.findByPk(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bicicleta não encontrada' });

    await bike.update(req.body);
    res.json(bike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar bicicleta' });
  }
}

// Remover bicicleta
async function remove(req, res) {
  try {
    const bike = await Bicicleta.findByPk(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bicicleta não encontrada' });

    await bike.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao remover bicicleta' });
  }
}

module.exports = { list, getOne, create, update, remove };
