const express = require('express');
const compression = require('compression');
const ejs = require('ejs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

// Verificação do ambiente de execução
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 5000;

// Conexão ao banco de dados MongoDB
const dbConfig = require('./config/database');
const dbURI = isProduction ? dbConfig.dbProduction : dbConfig.dbTest;

mongoose.connect(dbURI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro de conexão ao MongoDB:', err));

// Configurações de Middleware
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));
app.use(compression());
app.use(cors());
app.disable('x-powered-by');

// Para desenvolvimento, ativa o morgan para logging
if (!isProduction) app.use(morgan('dev'));

// Middleware para parsing de requests
app.use(express.urlencoded({ extended: false, limit: '1.5mb' }));
app.use(express.json({ limit: '1.5mb' }));

// Importando os modelos e rotas
require('./models');
app.use('/', require('./routes'));

// Tratamento de erro 404
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Tratamento de erros
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.status !== 404) {
        console.warn('Error: ', err.message, new Date());
    }
    res.json({ errors: { message: err.message, status: err.status } });
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
