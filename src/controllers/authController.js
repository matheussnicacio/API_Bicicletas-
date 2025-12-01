const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function login(req, res) {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ message: 'username e password são obrigatórios' });
const user = await Usuario.findOne({ where: { username } });
if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });
const ok = await bcrypt.compare(password, user.password_hash);
if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });
const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET || 'trocar_para_seguro', { expiresIn: '2h' });
res.json({ token });
}


async function register(req, res) {
const { username, password, nome, email } = req.body;
if (!username || !password) return res.status(400).json({ message: 'username e password são obrigatórios' });
const exists = await Usuario.findOne({ where: { username } });
if (exists) return res.status(409).json({ message: 'username já existe' });
const hash = await bcrypt.hash(password, 10);
const user = await Usuario.create({ username, password_hash: hash, nome, email });
res.status(201).json({ id: user.id, username: user.username });
}


module.exports = { login, register };