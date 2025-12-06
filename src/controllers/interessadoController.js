const { Interessado, Escolha, Bicicleta } = require('../models');

// Listar todos os interessados
async function list(req, res) {
  try {
    const interessados = await Interessado.findAll();
    res.json(interessados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar interessados' });
  }
}

// Buscar interessado por ID
async function getOne(req, res) {
  try {
    const interessado = await Interessado.findByPk(req.params.id);
    if (!interessado) return res.status(404).json({ message: 'Interessado não encontrado' });
    res.json(interessado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar interessado' });
  }
}

// Criar interessado
async function create(req, res) {
  try {
    const { nome, fone, email, altura_m } = req.body;
    if (!nome || !altura_m) {
      return res.status(400).json({ message: 'nome e altura_m são obrigatórios' });
    }
    const interessado = await Interessado.create({ nome, fone, email, altura_m });
    res.status(201).json(interessado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar interessado' });
  }
}

// Atualizar interessado
async function update(req, res) {
  try {
    const interessado = await Interessado.findByPk(req.params.id);
    if (!interessado) return res.status(404).json({ message: 'Interessado não encontrado' });

    await interessado.update(req.body);
    res.json(interessado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar interessado' });
  }
}

// Deletar interessado
async function remove(req, res) {
  try {
    const interessado = await Interessado.findByPk(req.params.id);
    if (!interessado) return res.status(404).json({ message: 'Interessado não encontrado' });

    await interessado.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao remover interessado' });
  }
}

const listEscolhas = async (req, res) => {
  try {
    const { id } = req.params;
    
    const escolhas = await Escolha.findAll({
      where: { interessado_id: id },
      include: [
        { 
          model: Bicicleta, 
          as: 'bicicletas', // Plural, como definido no index.js
          through: { attributes: [] } // Opcional: oculta os dados da tabela intermediária
        }
      ]
    });
    
    return res.status(200).json(escolhas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { list, getOne, create, update, remove, listEscolhas };
