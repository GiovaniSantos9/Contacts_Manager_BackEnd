require("dotenv").config()
const express = require('express')
const sequelize = require('./config/db');
const User = require('./models/User');

const app = express()
app.use(express.json());

sequelize.sync({ force: false }).then(() => {
  console.log('Banco sincronizado!');
});

app.get('/', (req, res) => {
  res.send('API do Sistema de Gerenciamento de contatos está rodando!')
})

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  console.log(req.body)
  const user = await User.create(req.body);
  res.json(user);
});

const port = process.env.PORT ?? 5000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})