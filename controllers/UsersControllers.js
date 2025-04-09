const db = require("../config/db")

module.exports = {
    async create(req, res) {
        const { nome, sobrenome, email, password } = req.body;
        const newUser = await db.models.User.create({ nome, sobrenome, email, password });
        res.status(201).json(newUser);
      },

    async getAll(req, res) {
        const users = await db.models.User.findAll();
        res.json(users); 
    }
}