// Importando express e dotenv
const express = require('express');
const dotenv = require('dotenv');
const clienteRoutes = require('./src/modulos/cliente/routes/index')


dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());

app.use("/api", clienteRoutes);


  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
  