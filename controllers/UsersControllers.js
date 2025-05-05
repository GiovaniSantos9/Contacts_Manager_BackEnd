const db = require("../config/db");
const bcrypt = require('bcrypt');
const validator = require('validator');

module.exports = {
  async create(req, res) {
    try {
      const { nome, sobrenome, email, password } = req.body;

      if (!nome?.trim() || !sobrenome?.trim() || !email?.trim() || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      }

      const normalizedEmail = validator.normalizeEmail(email.trim());

      if (!validator.isEmail(normalizedEmail)) {
        return res.status(400).json({ error: 'Email inválido' });
      }

      if (!validator.isStrongPassword(password, { minLength: 6, minLowercase: 1 })) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres e conter letras minúsculas.' });
      }

      const existingUser = await db.models.User.findOne({ where: { email: normalizedEmail } });
      if (existingUser) {
        return res.status(409).json({ error: 'E-mail já cadastrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.models.User.create({
        nome: nome.trim(),
        sobrenome: sobrenome.trim(),
        email: normalizedEmail,
        password: hashedPassword
      });

      res.status(201).json(newUser);
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async getAll(req, res) {
    try {
      const users = await db.models.User.findAll();
      res.json(users);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  }
};
