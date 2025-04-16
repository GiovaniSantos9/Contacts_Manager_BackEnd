const db = require("../config/db")
const bcrypt = require('bcrypt');

module.exports = {
    async create(req, res) {
        const { nome, sobrenome, email, password } = req.body;

        if (!nome || !sobrenome || !email || !password) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
          }

        const existingUser = await db.models.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'E-mail já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.models.User.create({ nome, sobrenome, email, password:hashedPassword });
        res.status(201).json(newUser);
      },

    async getAll(req, res) {
        const users = await db.models.User.findAll();
        res.json(users); 
    }
}