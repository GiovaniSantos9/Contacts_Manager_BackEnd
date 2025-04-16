require("dotenv").config()
const cors = require("cors");
const express = require('express')
const db = require('./config/db');
const usersRoutes = require('./routes/usersRoutes');

const app = express()

app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);

const port = process.env.PORT ?? 5000

db.connection.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}).catch(err => {
  console.error('Erro ao conectar no banco:', err);
});



