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

// Desativa o cabeçalho 'X-Powered-By'
app.disable('x-powered-by');

// Conexão ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rotas
app.get('/', (req, res) => {
  res.send('API do E-commerce - @josevan');
});

// Configuração de pastas estáticas (opcional, ajuste conforme necessário)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Tratamento de erros
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (err.status !== 404) console.warn('Error: ', err.message, new Date());
  res.json({ errors: { message: err.message, status: err.status } });
});

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
