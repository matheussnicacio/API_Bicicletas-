const { Escolha, Interessado, Bicicleta } = require('../models');

// Criar escolha de bicicletas para um interessado
async function create(req, res) {
  try {
    const { interessado_id, data_escolha, bicicletas } = req.body;

    if (!interessado_id || !data_escolha || !bicicletas?.length) {
      return res.status(400).json({ message: 'Dados incompletos' });
    }

    const interessado = await Interessado.findByPk(interessado_id);
    if (!interessado) return res.status(404).json({ message: 'Interessado não encontrado' });

    const altura = parseFloat(interessado.altura_m);

    const bikes = await Bicicleta.findAll({ where: { id: bicicletas.map(b => b.id) } });

    for (const bike of bikes) {
      if (
        (altura >= 1.50 && altura <= 1.65 && bike.quadro !== 15) ||
        (altura > 1.65 && altura <= 1.75 && bike.quadro !== 17) ||
        (altura > 1.75 && bike.quadro !== 18)
      ) {
        return res.status(400).json({ message: `Bicicleta ${bike.numero_serie} não adequada para a altura do interessado` });
      }
    }

    const escolha = await Escolha.create({ interessado_id, data_escolha });

    await escolha.addBicicletas(bikes.map(b => b.id));

    for (const bike of bikes) {
      await bike.update({ disponivel: false });
    }

    const escolhaCompleta = await Escolha.findByPk(escolha.id, { 
      include: [
        { model: Interessado, as: 'interessado' },
        { model: Bicicleta, as: 'bicicletas' }
      ] 
    });
    res.status(201).json(escolhaCompleta);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
}

// Listar todas as escolhas
async function list(req, res) {
  try {
    const escolhas = await Escolha.findAll({ 
      include: [
        { model: Interessado, as: 'interessado' },
        { model: Bicicleta, as: 'bicicletas' }
      ] 
    });
    res.json(escolhas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar escolhas' });
  }
}

// Buscar escolha por ID
async function getOne(req, res) {
  try {
    const escolha = await Escolha.findByPk(req.params.id, { 
      include: [
        { model: Interessado, as: 'interessado' },
        { model: Bicicleta, as: 'bicicletas' }
      ] 
    });
    if (!escolha) return res.status(404).json({ message: 'Escolha não encontrada' });
    res.json(escolha);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar escolha' });
  }
}

// Deletar escolha e liberar bicicletas
async function remove(req, res) {
  try {
    const escolha = await Escolha.findByPk(req.params.id, { 
      include: [{ model: Bicicleta, as: 'bicicletas' }] 
    });
    if (!escolha) return res.status(404).json({ message: 'Escolha não encontrada' });

    for (const bike of escolha.bicicletas) {
      await bike.update({ disponivel: true });
    }

    await escolha.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao remover escolha' });
  }
}

module.exports = { create, list, getOne, remove };