require("dotenv").config()
const express = require('express')
const db = require('./config/db');
const usersRoutes = require('./routes/usersRoutes');

const app = express()
app.use(express.json());
app.use('/users', usersRoutes);

const port = process.env.PORT ?? 5000

db.connection.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}).catch(err => {
  console.error('Erro ao conectar no banco:', err);
});



