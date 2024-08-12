const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

// Conexão ao banco de dados MongoDB (ajuste a URL de conexão conforme necessário)
mongoose.connect('mongodb://localhost:27017/ecommerce');

// Rotas
app.get('/', (req, res) => {
    res.send('API do E-commerce - @josevan');
});

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
